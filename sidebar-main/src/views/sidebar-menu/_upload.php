<?php

use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;

$form = ActiveForm::begin([
    'id' => 'ajax-form-price',
    'options' => ['data-pjax' => true, 'enctype' => 'multipart/form-data']
]); ?>

<div class="modal-body">
    <div class="row px-2">
        <div class="col-md-12">
            <?= $form->field($model, 'file', [
                'template' => '{label}<div class="input-group">{input}</div>{error}',
                'labelOptions' => ['class' => 'font-weight-bold'],
            ])->fileInput(['class' => 'form-control']) ?>
        </div>
    </div>
</div>

<div class="form-group mt-3 px-4">
    <?= Html::submitButton(Yii::t('app', 'آپلود'), ['class' => 'btn btn-success']) ?>
</div>

<?php ActiveForm::end(); ?>
