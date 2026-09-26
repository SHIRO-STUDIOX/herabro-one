<?php

namespace hesabro\sidebar\widgets;

use hesabro\sidebar\assets\UiAsset;
use yii\base\Widget;

class BadgeWidget extends Widget {

    public $text;

    public function getViewPath()
    {
        return __DIR__ . '/../views';
    }

    public function run()
    {
        UiAsset::register($this->getView());
        return $this->render('badge', [
            'text' => $this->text,
        ]);
    }
}