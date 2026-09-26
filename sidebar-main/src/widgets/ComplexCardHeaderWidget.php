<?php

namespace hesabro\sidebar\widgets;

use hesabro\sidebar\assets\UiAsset;
use yii\base\Widget;

class ComplexCardHeaderWidget extends Widget
{

    public $icon1;
    public $icon2;
    public $icon3;
    public $title;
    public $subtitle;
      

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

        return $this->render('complex_card_header', [
            'icon1' => $this->icon1,
            'icon2' => $this->icon2,
            'icon3' => $this->icon3,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
        ]);
    }
}
