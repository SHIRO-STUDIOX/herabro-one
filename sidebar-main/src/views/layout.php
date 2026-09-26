<?php

use hesabro\sidebar\widgets\HeaderWidget;

echo HeaderWidget::widget([
  'headerItemsView' => $headerItemsView,
  'logoPath' => $logoPath,
  'appName' => $appName,
  'appDesc' => $appDesc,
  'appBadgeTitle' => $appBadgeTitle,
  'profileMenuItems' => $profileMenuItems,
  'indexUrl' => $indexUrl,
  'client' => $client,
  'menuCardTitle' => $menuCardTitle ?? 'ابزارها',
  'menuCardSubtitle' => $menuCardSubtitle ?? 'کاوش در میان بازارچه‌ای از ابزارها',
  'menuCardIcon' => $menuCardIcon ?? null,
]);
?>