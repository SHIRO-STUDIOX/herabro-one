<?php

/**
 * @var yii\web\View $this
 * @var hesabro\sidebar\models\SidebarMenu $node 
 */

use common\components\ModuleItems;
use hesabro\sidebar\helpers\HelperParams;
use hesabro\sidebar\models\SidebarMenuAction;
use yii\bootstrap4\Html;
use yii\helpers\Url;
use yii\widgets\Pjax;

$modules = HelperParams::getModules();
$actionNode = $node->action ?? new SidebarMenuAction();
$actionNode->setAction = $node->action ? true : false;
?>
<div class="row">
    <div class="col-md-6">
        <?= $form->field($node, 'url')->textInput(['maxlength' => true]); ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($node, 'module')->dropDownList($modules, ['disabled' => $node->lvl != 0, 'prompt' => 'انتخاب کنید...']) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($node, 'regex_prefix')->textInput()->hint('مانند orders/dispatch') ; ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($node, 'regex_items')->textInput()->hint('فرمت: لیست اکشن‌ها جدا شده با | (مثال: index|view|details)') ?>
    </div>

</div>

<?php Pjax::begin(['id' => 'p-jax-sidebar-menu-action']);
echo $form->field($actionNode, 'setAction', [
    'template' => '{input}',
    'options' => ['tag' => false],
])->hiddenInput();

?>
<div class="row my-4 mx-0 d-flex align-items-center justify-content-between">
    <?php
    echo Html::button(
        '<h4 class="mb-0">تنظیمات جستجوی ویژه<i class="dropdown-arrow fas fa-chevron-down ' . ($actionNode->setAction ? 'rotate': ''). ' ml-2"></i></h4>',
        [
            'id' => 'action-toggle-button',
            'class' => 'btn p-0 text-right bg-transparent',
            'type' => 'button',
        ]
    );
    if ($actionNode?->id) {
        echo Html::a(
            'حذف تنظیمات جستجو',
            'javascript:void(0)',
            [
                'title'                      => 'حذف تنظیمات جستجو',
                'aria-label'                 => 'حذف تنظیمات جستجو',
                'data-reload-pjax-container' => 'p-jax-sidebar-menu-action',
                'data-pjax'                  => '0',
                'data-url'                   => Url::to(['/sidebar/sidebar-menu-action/delete/', 'id' => $actionNode->id]),
                'class'                      => "p-jax-btn btn btn-danger",
                'data-title'                 => 'حذف تنظیمات جستجو',
                'data-toggle'                => 'tooltip',
                'data-method'                => 'post'
            ]
        );
    }
    ?>
</div>

<div id="special-search-form" class="mb-2 <?= $node->action ? '' : 'hidden' ?>">
    <div class="row">
        <div class="col-md-6">
            <?= $form->field($actionNode, 'api_schema')->textInput() ?>
        </div>
        <div class="col-md-6">
            <?= $form->field($actionNode, 'api_key')->textInput() ?>
        </div>
        <div class="col-md-6">
            <?= $form->field($actionNode, 'item_url_schema')->textInput() ?>
        </div>
        <div class="col-md-6">
            <?= $form->field($actionNode, 'item_url_key')->textInput() ?>
        </div>
        <div class="col-md-6">
            <?= $form->field($actionNode, 'placeholder')->textInput([
                'value' => $actionNode->placeholder ?: 'جستجو'
            ]) ?>
        </div>
    </div>
</div>

<?php Pjax::end() ?>

<?php

$css = <<<CSS
#special-search-form {
    display: grid;
    transition: grid-template-rows 0.4s ease, opacity 0.4s ease;
    grid-template-rows: 1fr;
    opacity: 1;
}

#special-search-form.hidden {
    grid-template-rows: 0fr;
    opacity: 0;
    pointer-events: none;
}

#special-search-form > .row {
    overflow: hidden;
}

#action-toggle-button {
    color: #666;
}

#action-toggle-button i {
    font-size:14px;
    transition: transform 0.33s;
    transform: rotate(0);
}
#action-toggle-button i.rotate {
    font-size:14px;
    transform: rotate(180deg);
}

#action-toggle-button:focus {
    outline: none !important;
    box-shadow: none !important;
}
CSS;

$js = <<<JS
$(document).off('click', '#action-toggle-button').on('click', '#action-toggle-button', function() {
    const hiddenInput = $('#sidebarmenuaction-setaction');
    const arrow = $('.dropdown-arrow');
    let currentValue = hiddenInput.val() === '' ? 0 : parseInt(hiddenInput.val());
    let newValue = (currentValue === 1) ? 0 : 1;
    hiddenInput.val(newValue).trigger('change');
    const specialSearchForm = $('#special-search-form');
    specialSearchForm.toggleClass('hidden');

    arrow.toggleClass('rotate');

});
JS;
$this->registerJs($js);
$this->registerCss($css);
?>