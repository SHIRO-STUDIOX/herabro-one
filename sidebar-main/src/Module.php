<?php

namespace hesabro\sidebar;

use Yii;
use yii\base\InvalidConfigException;
use yii\base\Module as BaseModule;

/**
 * sidebar module definition class
 */
class Module extends BaseModule
{
    /**
     * @inheritdoc
     */
    public $controllerNamespace = 'hesabro\sidebar\controllers';
    public $dbMasterComponent = null;
    public $defaultModuleId;
    public $modulesCallback;
    public $managerPermission;
}
