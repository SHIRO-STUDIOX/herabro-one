<?php

namespace hesabro\sidebar\widgets;

use yii\base\Widget;

/**
 * @author Amir Rooholamini <amirrooholamini@gmail.com>
 */
class PndDropDown extends Widget
{

    public string $title;
    public array $menuItems;
    public ?string $icon = null;

    public function getViewPath()
    {
        return __DIR__ . '/../views';
    }

    public function run()
    {
        return $this->render('_pnd-dropdown', [
            'icon' => $this->icon,
            'title' => $this->title,
            'menuItems' => $this->menuItems,
        ]);
    }
}