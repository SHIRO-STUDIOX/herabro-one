<?php

use hesabro\notif\widgets\NotifWidget;
use hesabro\sidebar\helpers\HelperFile;
use yii\helpers\Html;

?>
<div class="pnd-header row pnd-m-0">
    <?= $this->render('sidebar_header', ['logoPath' => $logoPath, 'appName' => $appName, 'appBadgeTitle' => $appBadgeTitle, 'appDesc' => $appDesc, 'indexUrl' => $indexUrl]) ?>
    <div class="nav-bar pnd-d-flex pnd-justify-between">
        <div class="pnd-d-flex pnd-flex-row">
            <div class="pnd-hidden-mobile menu circle-button">
                <span class="text-primary-60 svg">
                    <?= HelperFile::getIcon('hamburger.svg') ?>
                </span>
            </div>
            <div class="pnd-hidden-mobile" id='navbar-menu-target'>
            </div>
            <div class="pnd-hidden-mobile">
                <?php if ($headerItemsView != null) {
                    echo $this->render($headerItemsView);
                } ?>
            </div>

        </div>

        <div class="pnd-d-flex">
            <?= Html::button(
                HelperFile::getIcon('search_bold.svg'),
                [
                    'class' => 'svg text-primary-60 circle-button pnd-tooltip',
                    'data-tooltip' => 'Ctrl K',
                    'id' => 'search-btn'
                ]
            ) ?>
            <div id='business-info-target'></div>
            <div id='profile-menu-target'></div>
        </div>

    </div>
</div>

<?php
$this->registerCss(<<<CSS

#notif-list-pjax {
    margin: 0 !important;
}
CSS);
?>

<?php
$js = <<<JS
document.querySelectorAll('.nav-bar li a.dropdown-toggle').forEach(function(el) {
    el.classList.remove('dropdown-toggle');
});

document.querySelectorAll('.nav-bar li').forEach(function(el) {
    el.style.listStyle = 'none';
});

const notifList = document.querySelector('.nav-bar #notif-list-pjax');
if (notifList) notifList.style.margin = '0';

// desktop search
document.getElementById("search-btn")?.addEventListener("click", function() {
    const event = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: "k",
        code: "KeyK",
        ctrlKey: true
    });
    document.dispatchEvent(event);
});

JS;

$this->registerJs($js);
?>