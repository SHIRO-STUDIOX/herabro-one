<?php

namespace hesabro\sidebar\widgets;

use hesabro\sidebar\assets\UiAsset;
use yii\base\Widget;

class LinkItemWidget extends Widget
{

    public $icon;
    public $text;
    public $mode = 'link'; // link - modal - api
    public $props = [];
    public $url;
    public $visible = true;
    public $content = null;
    public $shortKey = null;
    public $action = null;

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
        return $this->render('link_item', [
            'icon' => $this->icon,
            'text' => $this->text,
            'mode' => $this->mode,
            'props' => $this->props,
            'shortKey' => $this->shortKey,
            'action' => $this->action,
            'url' => $this->url,
            'visible' => $this->visible,
            'content' => $this->content,
        ]);
    }
}
