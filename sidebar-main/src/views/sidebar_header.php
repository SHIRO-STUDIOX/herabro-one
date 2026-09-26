<?php

use hesabro\sidebar\helpers\HelperFile;
use hesabro\sidebar\widgets\BadgeWidget;
use yii\helpers\Url;

?>
<?php if ($indexUrl): ?>
    <a class="sidebar-header" href="<?= $indexUrl ?>">
<?php else: ?>
    <a class="sidebar-header" onclick="window.location.href='<?= Url::to(['/site/index']) ?>'">
<?php endif; ?>
    <div class="logo-item">
        <span class="logo-icon svg"><?= HelperFile::getIcon($logoPath) ?></span>
    </div>
    <div class="sidebar-header-text" dir='rtl'>
        <div class="pnd-d-flex" style="gap: 8px">
           <span class="sidebar-header-title"><?= $appName ?></span> 
           <?= $appBadgeTitle ? BadgeWidget::widget(['text' => $appBadgeTitle]): ''; ?>
        </div>
        <span class="sidebar-header-desc"><?= $appDesc ?></span>
    </div>
</a>
