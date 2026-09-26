<?php

use yii\helpers\Html;

$isIcon1Html = $icon1 !== strip_tags($icon1);
?>

<div class="pnd-row">
    <?php if (!$isIcon1Html) {
        echo Html::img($icon1, [
            'class' => 'rounded-circle start-header-icon svg',
            'style' => 'object-position: center; object-fit: cover;',
        ]);
    } else { ?>
        <div class="bg-secondary-6 text-secondary-100 start-header-icon pnd-d-flex pnd-align-items-center justify-content-center">
            <?= $icon1 ?>
        </div>
    <?php } ?>
    <div class="pnd-flex-1 pnd-d-flex pnd-flex-column pnd-justify-content-center" style="margin-right: 12px;">
        <span class="text-title"><?= $title ?></span>
        <div class="text-subtitle" style="margin-top: 4px;"><?= $subtitle ?></div>
    </div>
</div>
