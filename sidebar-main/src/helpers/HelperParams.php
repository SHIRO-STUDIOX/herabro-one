<?php
namespace hesabro\sidebar\helpers;

use Yii;

class HelperParams
{
    private static $modules = null;
    public static function getDbMasterComponent()
    {
        return Yii::$app->getModule('sidebar')->dbMasterComponent;
    }

    public static function getDefaultModuleId()
    {
        return Yii::$app->getModule('sidebar')->defaultModuleId;
    }

    public static function getManagerPermission()
    {
        return Yii::$app->getModule('sidebar')->managerPermission;
    }

    public static function getModules()
    {
        if(!self::$modules) {
            $modulesCallback = Yii::$app->getModule('sidebar')->modulesCallback;
            self::$modules = call_user_func($modulesCallback);
        }
        return self::$modules;
    }
}
