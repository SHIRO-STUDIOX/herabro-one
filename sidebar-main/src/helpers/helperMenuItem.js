export function isLocked(item) {
  return item?.lock === true || item?.locked === true;
}
