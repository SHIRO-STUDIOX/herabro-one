<?php

namespace hesabro\sidebar\widgets;

use hesabro\sidebar\assets\UiAsset;
use yii\base\Widget;

class LayoutWidget extends Widget
{
    public $indexUrl = null;
    public $logoPath;
    public $appName;
    public $appDesc;
    public $appBadgeTitle;
    public $profileMenuItems;
    public $quickActionItems;

    public $primaryColor;
    public $whiteColor;
    public $backgroundColor;
    public $secondaryColor;
    public $errorColor;

    public $menuItems;
    public $client = null;
    public $headerItemsView;
    public $dbName;

    public $modules; // must remove after changes in new_sidebar_header in hesabro & mobit

    /**
     * @var string Title for the module dropdown menu card header (defaults to 'ابزارها')
     */
    public $menuCardTitle = 'ابزارها';

    /**
     * @var string Subtitle for the module dropdown menu card header
     */
    public $menuCardSubtitle = 'کاوش در میان بازارچه‌ای از ابزارها';

    /**
     * @var string|null Custom icon for the module dropdown menu card header (defaults to 'tools.svg')
     */
    public $menuCardIcon = null;

    /**
     * @var string|null Alias property for $menuCardTitle
     */
    public $menuTitle;

    /**
     * @var string|null Alias property for $menuCardSubtitle
     */
    public $menuSubtitle;

    public function init()
    {
        parent::init();

        if ($this->menuTitle !== null) {
            $this->menuCardTitle = $this->menuTitle;
        }
        if ($this->menuSubtitle !== null) {
            $this->menuCardSubtitle = $this->menuSubtitle;
        }

        if ($this->primaryColor === null) {
            throw new \yii\base\InvalidConfigException('primaryColor is required');
        }
        if ($this->whiteColor === null) {
            throw new \yii\base\InvalidConfigException('whiteColor is required');
        }
        if ($this->backgroundColor === null) {
            throw new \yii\base\InvalidConfigException('backgroundColor is required');
        }
        if ($this->secondaryColor === null) {
            throw new \yii\base\InvalidConfigException('secondaryColor is required');
        }
        if ($this->errorColor === null) {
            throw new \yii\base\InvalidConfigException('error is required');
        }

        if ($this->menuItems === null) {
            throw new \yii\base\InvalidConfigException('menuItems is required');
        }

        if ($this->appName === null) {
            throw new \yii\base\InvalidConfigException('appName is required');
        }
        if ($this->appDesc === null) {
            throw new \yii\base\InvalidConfigException('appDesc is required');
        }
        
        if ($this->logoPath === null) {
            throw new \yii\base\InvalidConfigException('logoPath is required');
        }

        if ($this->quickActionItems === null) {
            $this->quickActionItems = [];
        }
    }

    public function getViewPath()
    {
        return __DIR__ . '/../views';
    }

    public function run()
    {
        UiAsset::register($this->getView());
        return $this->render(
            'layout',
            [
                'headerItemsView' => $this->headerItemsView,
                'menuItems' => $this->menuItems,
                'logoPath' => $this->logoPath,
                'appName' => $this->appName,
                'appDesc' => $this->appDesc,
                'appBadgeTitle' => $this->appBadgeTitle,
                'profileMenuItems' => $this->profileMenuItems,
                'quickActionItems' => $this->quickActionItems,
                'indexUrl' => $this->indexUrl,
                'client' => $this->client,
                'menuCardTitle' => $this->menuCardTitle,
                'menuCardSubtitle' => $this->menuCardSubtitle,
                'menuCardIcon' => $this->menuCardIcon,
            ]
        );
    }
    
}
