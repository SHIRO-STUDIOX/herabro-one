<?php

use common\components\ModuleItems;
use hesabro\sidebar\helpers\HelperParams;
use hesabro\sidebar\models\SidebarMenu;
use kartik\tree\Module;
use kartik\tree\TreeView;
use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;
use yii\helpers\Url;
use yii\widgets\Pjax;

$this->title = "منوهای سایدبار";
$this->params['breadcrumbs'][] = $this->title;

$modules = HelperParams::getModules();

/** @var $searchModel app\models\SidebarMenuSearch */
?>
<?php $form = ActiveForm::begin([
    'id' => 'formula-list',
    'method' => 'get',
    'action' => Url::to(['index']),
]); ?>
<div class="row align-items-center">
    <div class="col-md-3">
        <?= $form->field($model, 'module')->dropDownList($modules, [
            'onchange' => 'this.form.submit();',
            'prompt' => 'همه'
        ]) ?>
    </div>
    <div class="col-md-9 d-flex justify-content-end" style="gap:10px">
        <?= Html::a(
            'دریافت خروجی JSON',
            Url::to(['sidebar-menu/export-json']),
            [
                'class' => 'btn btn-warning',
            ]
        )
        ?>
        <?= Html::a(
            'آپلود فایل JSON',
            "javascript:void(0)",
            [
                'data-pjax' => '0',
                'data-reload-pjax-container' => 'p-jax-sidebar-menu-list',
                'class' => "btn btn-primary",
                'id' => 'upload-json-btn',
                'data-size' => 'modal-xl',
                'data-title' => 'آپلود فایل JSON',
                'data-toggle' => 'modal',
                'data-target' => '#modal-pjax',
                'data-url' => Url::to(['/sidebar/sidebar-menu/import-json']),
                'data-handle-form-submit' => 1,
                'data-show-loading' => 0,
                'disabled' => true,
            ]
        )
        ?>
    </div>
</div>
<?php ActiveForm::end(); ?>


<?php Pjax::begin(['id' => 'p-jax-sidebar-menu-list']); ?>

<?= TreeView::widget([
    'query' => $query,
    'headingOptions' => ['label' => 'مدیریت منوها'],
    'isAdmin' => true,
    'displayValue' => 1,
    'softDelete' => true,
    'allowNewRoots' => true,
    'showInactive' => true,
    'cacheSettings' => ['enableCache' => false],
    'nodeAddlViews' => [
        Module::VIEW_PART_2 => '@subModules/sidebar/src/views/sidebar-menu/_additional-attributes',
    ]
]); ?>
<?php Pjax::end(); ?>

<?php 
$css = <<<CSS
    .kv-tree-container {
    height: 55vh !important
    }
    CSS;

    $js=<<<JS
    $('#sidebar-tree').on('treeview.beforeRemove', function(event, data) {
    if (!confirm("آیا مطمئنید که می‌خواهید این منو حذف شود؟")) {
    return false;
    }
    });
    JS;


    $this->registerCss($css);
    $this->registerJs($js);

    ?>