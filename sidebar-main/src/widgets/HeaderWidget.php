<?php

namespace hesabro\sidebar\widgets;

use hesabro\sidebar\assets\UiAsset;
use yii\base\Widget;

class HeaderWidget extends Widget
{

    public $indexUrl;
    public $logoPath;
    public $appName;
    public $appDesc;
    public $appBadgeTitle;
    public $headerItemsView;
    public $profileMenuItems;
    public $client;

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

    public function init()
    {
        parent::init();
    }

    public function getViewPath()
    {
        return __DIR__ . '/../views';
    }

    public function run()
    {
        UiAsset::register($this->getView());
        return $this->render('header', [
            'headerItemsView' => $this->headerItemsView,
            'indexUrl' => $this->indexUrl,
            'logoPath' => $this->logoPath,
            'appName' => $this->appName,
            'appDesc' => $this->appDesc,
            'appBadgeTitle' => $this->appBadgeTitle,
            'profileMenuItems' => $this->profileMenuItems,
            'client' => $this->client,
            'menuCardTitle' => $this->menuCardTitle,
            'menuCardSubtitle' => $this->menuCardSubtitle,
            'menuCardIcon' => $this->menuCardIcon,
        ]);
    }
}
