<?php

namespace hesabro\sidebar\assets;

use yii\web\AssetBundle;

class UiAsset extends AssetBundle
{
    public $sourcePath = '@subModules/sidebar/src/assets';
    public $css = [
        'css/variables.css',
        'css/global.css',
        'css/sidebar.css',
        'css/header.css',
        'css/header_profile.css',
        'css/header_menu.css',
        'css/header_switcher.css',
        'css/footer.css',
        'css/link_option.css',
        'css/scroll.css',
        'css/content.css',
        'fonts/iranYekanXWebFonts/css/style.css',
        'css/colors.css',
        'css/modal.css',
        'css/tooltip.css',
        'css/searchbar.css',
        'css/quick_actions.css',
        'css/leftbar.css',
        'css/breadcrumbs.css',
        'css/p-design-system.css',
        'vue/assets/css/sidebar.bundle.css'
    ];

    public $js = [
        'js/sidebar.js',
        'vue/sidebar.bundle.js'
    ];

}
