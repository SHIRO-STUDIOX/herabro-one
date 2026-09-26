<?php

use common\components\Helper;
use hesabro\sidebar\helpers\HelperFile;
use hesabro\sidebar\widgets\LinkItemWidget;

?>

<ul class="corner-button" style="padding: 0 !important; margin: 0 6px">
  <li class="drop-down pnd-dropdown-item" style="position: relative; padding: 12px; cursor:pointer; max-height:44px">
    <a id="profileDropdown" class="pnd-d-flex pnd-align-items-center pnd-dropdown-trigger" style="flex-wrap:nowrap; white-space:nowrap;">
    <?php if($icon): ?>
      <span class="text-primary-60 svg pnd-d-flex dropdown-icon pnd-icon-tablet-only"><?= HelperFile::getIcon($icon) ?></span>  
    <?php endif;?>
    <span class="button-text pnd-hidden-tablet" style="margin: 0 6px 0 12px; white-space:nowrap;"><?= $title ?></span>
      <i class="fas fa-chevron-down toggle-icon pnd-hidden-tablet"></i>
    </a>

    <div class="pnd-dropdown-card" style="position: absolute; display: none;">
      <div class="pnd-dropdown-card-content" dir='rtl'>
        <div style="display: flex; flex-direction: column; gap: 4px !important;">
          <?php
          foreach ($menuItems as $item) {
            echo LinkItemWidget::widget($item);
          }
          ?>
        </div>
      </div>
    </div>
  </li>
</ul>

<?php
$js = <<<JS
document.querySelectorAll(".drop-down").forEach(function (dropdown) {
  const dropDownCard = dropdown.querySelector(".pnd-dropdown-card");
  const toggleIcon = dropdown.querySelector(".toggle-icon");

  if (!dropDownCard) return;

  dropDownCard.style.transition = "opacity 0.15s ease";
  dropDownCard.style.opacity = 0;
  dropDownCard.style.display = "none";

  dropdown.addEventListener("mouseenter", function () {
    dropDownCard.style.display = "block";
    requestAnimationFrame(() => {
        dropDownCard.style.opacity = 1;
    });
    if (toggleIcon) toggleIcon.classList.add("rotate-180");
  });

  dropdown.addEventListener("mouseleave", function () {
    dropDownCard.style.opacity = 0;
    dropDownCard.addEventListener(
      "transitionend",
      function hideAfterFade() {
        dropDownCard.style.display = "none";
        dropDownCard.removeEventListener("transitionend", hideAfterFade);
      }
    );
    if (toggleIcon) toggleIcon.classList.remove("rotate-180");
  });
});
JS;
$this->registerJs($js);
?>