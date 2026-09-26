<?php

use hesabro\sidebar\helpers\HelperFile;
use hesabro\sidebar\helpers\HelperModule;
use hesabro\sidebar\widgets\ComplexCardHeaderWidget;
use yii\helpers\Url;

$modules = array_filter($modules, function ($module) {
    return HelperModule::isVisible($module);
});

// Resolve dynamic title, subtitle, and icon with backward-compatible defaults
$cardTitle = $title ?? $menuCardTitle ?? 'ابزارها';
$cardSubtitle = $subtitle ?? $menuCardSubtitle ?? 'کاوش در میان بازارچه‌ای از ابزارها';
$cardIcon = $icon1 ?? (isset($menuCardIcon) && !empty($menuCardIcon) ? HelperFile::getIcon($menuCardIcon) : HelperFile::getIcon('tools.svg'));

?>
<ul class="corner-button" style="padding: 0 !important; margin-left: 12px">
    <li class="drop-down" id='menu-button' style="position: relative; padding: 12px;">
        <a class="pnd-d-flex pnd-align-items-center">
            <span class="button-text" style="margin: 0 6px 0 12px; color:white;">
                <?= HelperModule::getActiveModule($modules)['label'] ?? 'سایر' ?>
            </span>
            <i class="fas fa-chevron-down toggle-icon" style="color: white"></i>
        </a>

        <div class="menu-card-container">
            <div class="menu-card" dir='rtl'>
                <?= ComplexCardHeaderWidget::widget([
                    'icon1' => $cardIcon,
                    'title' => $cardTitle,
                    'subtitle' => $cardSubtitle
                ]) ?>
                <div class="divider" style="margin: 12px 0 0 0px"></div>
                <div style="position: relative;">
                    <div class="pnd-gradient-top"></div>
                    <div class="pnd-gradient-bottom"></div>
                    <div id='menu-card-content' class="hide-scrollbar mirror-gradient" style="height: 344px; overflow-y: auto; padding-top:8px">
                        <?php
                        $chunks = array_chunk($modules, 3, true);
                        $lastIndex = count($chunks) - 1;
                        foreach ($chunks as $i => $chunk) {
                            $isLastChunk = ($i === $lastIndex);
                            $style = 'gap:8px; min-height: 96px; margin-right: auto; margin-left: auto;';
                            if ($isLastChunk) {
                                $style .= ' margin-bottom:10px !important;';
                            }
                        ?>
                            <div class="pnd-row" style="<?= $style ?>">
                                <?php
                                foreach ($chunk as $item) {
                                    $icon = $item['icon'];
                                    $activeClass = $item['active'] == true ? 'active' : '';
                                    $route = $item['url'];
                                    $name = $item['label'];
                                    $hasAccess = HelperModule::hasAccess($item);
                                    $href = $hasAccess ? Url::to($route) : 'javascript:void(0)';
                                ?>
                                    <?php if($hasAccess): ?>
                                        <a class="module-card <?= $activeClass ?>" href="<?=$href?>">
                                    <?php else: ?>
                                        <a class="module-card locked <?= $activeClass ?>">
                                            <span class="lock-icon svg">
                                                <?= HelperFile::getIcon('/lock.svg') ?>
                                            </span>
                                    <?php endif; ?>
                                        <div class="pnd-d-flex pnd-flex-column pnd-align-items-center">
                                            <span class="svg module-icon pnd-d-flex">
                                                <?= HelperFile::getIcon($icon) ?>
                                            </span>
                                            <span class="module-text"><?= $name ?></span>
                                        </div>
                                    </a>
                                <?php } ?>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </li>
</ul>

