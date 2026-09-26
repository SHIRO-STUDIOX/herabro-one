<?php
namespace hesabro\sidebar\helpers;

use Yii;

class HelperFile
{
    public static function getIcon($filename)
    {
        // Return empty string if filename is null or empty
        if (empty($filename)) {
            return '';
        }

        // 1. Direct SVG markup detection: If the string already contains an SVG element, return it directly
        if (stripos($filename, '<svg') !== false) {
            return $filename;
        }

        $cleanPath = ltrim($filename, '/\\');

        // 2. Yii Alias resolution: When path starts with '@' (e.g. '@root/hub/web/images/logo.svg')
        if (str_starts_with($filename, '@')) {
            $resolved = Yii::getAlias($filename, false);
            if ($resolved && is_file($resolved)) {
                return file_get_contents($resolved);
            }
        }

        // 3. Direct absolute or relative filesystem check
        if (is_file($filename)) {
            return file_get_contents($filename);
        }

        // 4. Resolve relative to Project Root (ensuring host projects resolve from project root)
        $projectRoot = Yii::getAlias('@root', false);
        if (!$projectRoot) {
            // If @root alias is not defined in the host application, attempt resolution via vendor or basePath
            if (Yii::getAlias('@vendor', false)) {
                $projectRoot = dirname(Yii::getAlias('@vendor'));
            } elseif (isset(Yii::$app) && Yii::$app->basePath) {
                $projectRoot = dirname(Yii::$app->basePath);
            }
        }

        if ($projectRoot) {
            $candidate = rtrim($projectRoot, '/\\') . DIRECTORY_SEPARATOR . $cleanPath;
            if (is_file($candidate)) {
                return file_get_contents($candidate);
            }
        }

        // 5. Resolve relative to @app or @webroot if defined in the current application context
        if ($appRoot = Yii::getAlias('@app', false)) {
            $candidate = rtrim($appRoot, '/\\') . DIRECTORY_SEPARATOR . $cleanPath;
            if (is_file($candidate)) {
                return file_get_contents($candidate);
            }
        }
        if ($webRoot = Yii::getAlias('@webroot', false)) {
            $candidate = rtrim($webRoot, '/\\') . DIRECTORY_SEPARATOR . $cleanPath;
            if (is_file($candidate)) {
                return file_get_contents($candidate);
            }
        }

        // 6. Submodule internal icon fallback (ensures backward compatibility for other projects using submodule assets)
        $submoduleBase = Yii::getAlias('@subModules/sidebar/src/assets/icons/' . $cleanPath, false);
        if ($submoduleBase && is_file($submoduleBase)) {
            return file_get_contents($submoduleBase);
        }

        $submoduleModules = Yii::getAlias('@subModules/sidebar/src/assets/icons/modules/' . $cleanPath, false);
        if ($submoduleModules && is_file($submoduleModules)) {
            return file_get_contents($submoduleModules);
        }

        $submoduleLogos = Yii::getAlias('@subModules/sidebar/src/assets/icons/logos/' . $cleanPath, false);
        if ($submoduleLogos && is_file($submoduleLogos)) {
            return file_get_contents($submoduleLogos);
        }

        // If file could not be found in any location, return empty string safely without error
        return '';
    }

    /**
     * Alias method for resolving application or brand logos.
     * Delegates directly to `getIcon()`.
     *
     * @param string|null $filePath The logo file path, alias, or raw SVG.
     * @return string The SVG markup content or empty string.
     */
    public static function getLogo($filePath)
    {
        return self::getIcon($filePath);
    }

    /**
     * Retrieves application icon by file path or direct SVG string.
     *
     * @param string|null $filePath
     * @return string|null
     */
    public static function getAppIcon($filePath)
    {
        if (empty($filePath)) {
            return null;
        }
        if (str_starts_with(trim($filePath), '<svg')) {
            return $filePath;
        }
        if (is_file($filePath)) {
            return file_get_contents($filePath);
        }
        return null;
    }
}
