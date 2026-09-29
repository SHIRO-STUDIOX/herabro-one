/**
 * Hesabro-one Centralized Formatting & Number Utilities
 * Standardizes Persian numbers, currency, words conversion, and date formatting.
 */
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
/**
 * Converts English or Arabic digits in any string or number to Persian digits.
 */
export function toPersianNumber(value) {
    if (value === null || value === undefined)
        return '';
    return String(value)
        .replace(/[0-9]/g, (w) => PERSIAN_DIGITS[+w] || w)
        .replace(/[٠-٩]/g, (w) => PERSIAN_DIGITS[ARABIC_DIGITS.indexOf(w)] || w);
}
/**
 * Converts Persian or Arabic digits to standard English (ASCII) digits.
 */
export function toEnglishNumber(value) {
    if (!value)
        return '';
    return String(value)
        .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
        .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));
}
/**
 * Parses any string with Persian/English digits and commas into a clean number.
 */
export function parseFormattedNumber(value) {
    if (value === null || value === undefined)
        return 0;
    if (typeof value === 'number')
        return isNaN(value) ? 0 : value;
    const normalized = toEnglishNumber(String(value))
        .replace(/,/g, '')
        .replace(/[^0-9.-]/g, '');
    const parsed = Number(normalized);
    return isNaN(parsed) ? 0 : parsed;
}
/**
 * Formats a number with comma thousand-separators and converts to Persian digits.
 * Example: 1500000 -> '۱,۵۰۰,۰۰۰'
 */
export function formatCurrency(num) {
    if (num === null || num === undefined)
        return '۰';
    const cleanNum = typeof num === 'number' ? num : parseFormattedNumber(num);
    if (cleanNum === 0)
        return '۰';
    const isNegative = cleanNum < 0;
    const absNum = Math.abs(cleanNum);
    const formatted = toPersianNumber(absNum.toLocaleString('en-US'));
    return isNegative ? `\u200E-${formatted}` : formatted;
}
/**
 * Converts numeric amount to Persian words.
 * Example: 3500000 -> 'سه میلیون و پانصد هزار'
 */
export function convertNumberToPersianWords(num) {
    const cleanNum = typeof num === 'number' ? num : parseFormattedNumber(num);
    if (cleanNum === 0)
        return 'صفر';
    if (isNaN(cleanNum))
        return '';
    const ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    const teens = [
        'ده',
        'یازده',
        'دوازده',
        'سیزده',
        'چهارده',
        'پانزده',
        'شانزده',
        'هفده',
        'هجده',
        'نوزده',
    ];
    const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    const hundreds = [
        '',
        'یکصد',
        'دویست',
        'سیصد',
        'چهارصد',
        'پانصد',
        'ششصد',
        'هفتصد',
        'هشتصد',
        'نهصد',
    ];
    const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'همت'];
    let n = Math.abs(cleanNum);
    const parts = [];
    let chunkCount = 0;
    while (n > 0) {
        const chunk = n % 1000;
        if (chunk !== 0) {
            const chunkWords = [];
            const h = Math.floor(chunk / 100);
            const t = Math.floor((chunk % 100) / 10);
            const o = chunk % 10;
            if (h > 0 && hundreds[h])
                chunkWords.push(hundreds[h]);
            if (t === 1 && teens[o]) {
                chunkWords.push(teens[o]);
            }
            else {
                if (t > 1 && tens[t])
                    chunkWords.push(tens[t]);
                if (o > 0 && ones[o])
                    chunkWords.push(ones[o]);
            }
            let chunkStr = chunkWords.join(' و ');
            if (thousands[chunkCount]) {
                chunkStr += ` ${thousands[chunkCount]}`;
            }
            parts.unshift(chunkStr);
        }
        n = Math.floor(n / 1000);
        chunkCount++;
    }
    const result = parts.join(' و ');
    return cleanNum < 0 ? `منفی ${result}` : result;
}
