<?php

use common\components\Helper;
use common\models\User;
use hesabro\sidebar\helpers\HelperFile;
use hesabro\sidebar\widgets\ComplexCardHeaderWidget;
use hesabro\sidebar\widgets\LinkItemWidget;
use yii\helpers\Html;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $identity yii\web\IdentityInterface */

/** @var User $identity */
$identity = Yii::$app->user->identity;
$route = Helper::getUrlRoute();
$moduleId = Yii::$app->controller->module?->id;
$moduleRoute = str_starts_with($moduleId, 'app-') ? '' : "/$moduleId/";
$full_name = trim($identity->fullName);
?>
<ul class="corner-button" style="padding: 0 !important;">
    <li class="drop-down" style="position: relative; padding: 12px; cursor:pointer;">
        <a id="profileDropdown" class="pnd-d-flex pnd-align-items-center" style="flex-wrap:nowrap; white-space:nowrap;">
            <span class="text-primary-60 svg pnd-d-flex"><?= HelperFile::getIcon('user.svg') ?></span>
            <span class="pnd-hidden-mobile button-text" style="margin: 0 6px 0 12px; white-space:nowrap;"><?= Html::encode($identity->fullName) ?></span>
            <i class="pnd-hidden-mobile fas fa-chevron-down toggle-icon"></i>
        </a>

        <div class="profile-card" style="position: absolute; display: none;">
            <div class="profile-card-content" dir='rtl'>
                <?php if ($avatar = $identity->getFileUrl('avatar')) {
                    $icon1 = $avatar;
                } else {
                    $icon1 = HelperFile::getIcon('user.svg');
                } ?>
                <?= ComplexCardHeaderWidget::widget([
                    'icon1' => $icon1,
                    'title' => !empty($full_name) ? $full_name : $identity->username,
                    'subtitle' => Html::encode($identity->username)
                ]) ?>
                <div class="divider" style="margin: 12px 0px"></div>
                <div class="business" style="margin-bottom: 12px">
                    <?= ComplexCardHeaderWidget::widget([
                        'icon1' => $client?->icon ?? HelperFile::getIcon('branch.svg'),
                        'title' => $client['text'] ?? '-',
                        'subtitle' => 'کسب‌و‌کار شما'
                    ]) ?>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4px !important;">
                    <?php
                    foreach ($profileMenuItems as $item) {
                        if (isset($item['visible'])) {
                            if (is_callable($item['visible'])) {
                                if (!$item['visible']()) {
                                    continue;
                                }
                            } elseif ($item['visible'] == false) {
                                continue;
                            }
                        }

                        echo LinkItemWidget::widget($item);
                    }
                    ?>

                    <div class="divider" style="margin: 12px 0px"></div>
                </div>
                <div id="logout-container">
                    <a href="<?= Url::to(['/site/logout']) ?>" data-method="post" id="logout" class="link-option-text">خروج از حساب کاربری </a>
                </div>
            </div>
        </div>
    </li>
</ul>

<?php
$js = <<<JS
document.querySelectorAll(".drop-down").forEach(function (dropdown) {
  const profileCard = dropdown.querySelector(".profile-card");
  const toggleIcon = dropdown.querySelector(".toggle-icon");
  if (!profileCard) return;

  profileCard.style.transition = "opacity 0.15s ease";
  profileCard.style.opacity = 0;
  profileCard.style.display = "none";

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
  dropdown.addEventListener("click", function () {
    if (profileCard.style.display === 'block') {
      closeProfileMenu();
    } else {
      openProfileMenu();
    }
  });
} else {
  dropdown.addEventListener("mouseenter", openProfileMenu);
  dropdown.addEventListener("mouseleave", closeProfileMenu);
}

  function openProfileMenu() {
    
    profileCard.style.display = "block";
    requestAnimationFrame(() => {
      profileCard.style.opacity = 1;
    });
    if (toggleIcon) toggleIcon.classList.add("rotate-180");
  }

  function closeProfileMenu() {
    
    profileCard.style.opacity = 0;
    profileCard.addEventListener(
      "transitionend",
      function hideAfterFade() {
        profileCard.style.display = "none";
        profileCard.removeEventListener("transitionend", hideAfterFade);
      }
    );
    if (toggleIcon) toggleIcon.classList.remove("rotate-180");
  }

});
JS;
$this->registerJs($js);
?>