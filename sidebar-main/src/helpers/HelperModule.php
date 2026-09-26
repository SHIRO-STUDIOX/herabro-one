<?php

namespace hesabro\sidebar\helpers;

use Yii;
use yii\helpers\Url;

class HelperModule
{

    public static function getActiveModule($modules)
    {
        foreach ($modules as $module) {
            if (isset($module['active']) && $module['active'] == true) {
                return $module;
            }
        }
        return null;
    }

    public static function isLocked($item)
    {
        $locked = false;
        if (isset($item['locked'])) {
            $locked = is_callable($item['locked']) ? $item['locked']() : (bool)$item['locked'];
            return $locked;
        }

        if (isset($item['lock'])) {
            $locked = is_callable($item['lock']) ? $item['lock']() : (bool)$item['lock'];
            return $locked;
        }

        if (isset($item['options']['class'])) {
            $class = $item['options']['class'];

            if (is_string($class)) {
                $locked = strpos($class, 'locked') !== false;
            } elseif (is_array($class)) {
                $locked = in_array('locked', $class);
            }
            return $locked;
        }
        return $locked;
    }

    # Modules 
    public static function hasAccess($module) # is not locked for module - show/not show for menus
    {
        $hasAccess = true;
        if (array_key_exists('hasAccess', $module)) {
            $access = $module['hasAccess'];

            if (is_callable($access)) {
                $hasAccess = $access();
            } else {
                $hasAccess = $access;
            }
        }
        return $hasAccess;
    }

    public static function isVisible($module) # show item for module
    {
        return !(
            isset($module['visible']) &&
            $module['visible'] === false
        );
    }

    public static function prepareCleanItemsForSearch(array $items, int $level = 0): array
    {
        $result = [];

        foreach ($items as $item) {
            //  اجرای کلیدهایی که مقدار قابل فراخوانی دارند
            foreach ($item as $key => $value) {
                if (is_callable($value) && !is_string($value)) {
                    $item[$key] = call_user_func($value);
                }
            }

            // از سطح اول (یعنی ماژول ها) اونایی که visible = false دارن حذف بشن
            if ($level === 0 && isset($item['visible']) && !$item['visible']) {
                continue;
            }

                // سطح اول یعنی ماژول ها: اگر hasAccess = false(locked) بود، فقط زیرمنوهاش رو حذف کن
            if ($level === 0 && isset($item['hasAccess']) && !$item['hasAccess']) {
                unset($item['items']);
            }

            // از سطوح بعدی (یعنی منو ها) اونایی که hasAccess = false دارن حذف بشن
            if ($level > 0 && isset($item['hasAccess']) && !$item['hasAccess']) {
                continue;
            }

            // تبدیل URL
            if (isset($item['url'])) {
                $item['url'] = Url::to($item['url']);
            }

            // هندل کردن آیکن سطح اول
            if ($level === 0 && isset($item['icon'])) {
                $item['icon'] = HelperFile::getAppIcon($item['icon']);
            }

            // بازگشتی روی items
            if (isset($item['items']) && is_array($item['items'])) {
                $item['items'] = self::prepareCleanItemsForSearch($item['items'], $level + 1);

                if (empty($item['items']) && !isset($item['url'])) {
                    continue;
                }

                if (empty($item['items'])) {
                    unset($item['items']);
                }
            }

            $result[] = $item;
        }

        return $result;
    }
}
