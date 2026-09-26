<?php

namespace hesabro\sidebar\widgets;

use yii\base\Widget;
use yii\helpers\Json;
use hesabro\helpers\components\iconify\Iconify;

/**
 * PageActionsWidget registers header page-action buttons for the sidebar ContentHeader component.
 *
 * Usage:
 * ```php
 * <?= PageActionsWidget::widget([
 *     'actions' => [
 *         PageActionsWidget::searchToggle('#collapseOne'),
 *         PageActionsWidget::link('fas fa-plus', 'Create', ['/invoice/factor/create']),
 *         PageActionsWidget::dropdown('fas fa-cog', 'Operations', [
 *             PageActionsWidget::item('Upload', 'javascript:void(0)', ['data-toggle' => 'modal', ...]),
 *             PageActionsWidget::separator(),
 *             PageActionsWidget::item('Print', 'javascript:void(0)', ['data-toggle' => 'modal', ...], 'fillKeys()'),
 *         ]),
 *     ],
 * ]) ?>
 * ```
 */
class PageActionsWidget extends Widget
{
  /** @var array List of action definitions */
  public $actions = [];

  public function run()
  {
    $json = Json::encode($this->actions);
    $this->view->registerJs(<<<JS
            window.dispatchEvent(new CustomEvent('setPageActions', {
                detail: { actions: $json }
            }));
        JS);
  }

    // ---- Static helpers for building action arrays ----

  /**
   * Creates a search toggle button action (now using filter icon).
   */
  public static function searchToggle(string $collapseSelector, string $tooltip = 'جست‌وجو'): array
  {
    return [
      'icon' => Iconify::getInstance()->icon('solar:magnifer-bold-duotone', 'solar-magnifer', ['width' => 20, 'height' => 20]),
      'tooltip' => $tooltip,
      'url' => 'javascript:void(0)',
      'attrs' => [
        'data-toggle' => 'collapse',
        'data-target' => $collapseSelector,
      ],
      'btnType' => 'white',
      'outline' => true
    ];
  }

  /**
   * Creates a standard "Create" button (success color, no outline).
   */
  public static function create($url, string $tooltip = null, array $attrs = [], string $jsCallback = null): array
  {
    return self::link(
      'fas fa-plus',
      $tooltip ?? \Yii::t('app', 'Create'),
      $url,
      $attrs,
      $jsCallback,
      'success',
      false
    );
  }

  /**
   * Creates a "Create" button that triggers a modal.
   */
  public static function createModal(string $url, string $tooltip = null, string $target = '#modal-pjax', array $extraAttrs = []): array
  {
    return self::modal(
      'fas fa-plus',
      $tooltip ?? \Yii::t('app', 'Create'),
      $target,
      $url,
      $extraAttrs,
      'success',
      false
    );
  }

  /**
   * Creates a simple link button action.
   */
  public static function link(string $icon, string $tooltip, $url, array $attrs = [], string $jsCallback = null, string $btnType = 'white', bool $outline = true, $disabled = false): array
  {
    $action = [
      'icon' => $icon,
      'tooltip' => $tooltip,
      'url' => is_array($url) ? \yii\helpers\Url::to($url) : $url,
      'btnType' => $btnType,
      'outline' => $outline,
      'disabled' => $disabled,
    ];
    if (!empty($attrs)) {
      $action['attrs'] = $attrs;
    }
    return $action;
  }

  /**
   * Creates a modal-trigger button action.
   */
  public static function modal(string $icon, string $tooltip, string $target, string $url = null, array $extraAttrs = [], string $btnType = 'white', bool $outline = true, $disabled = false): array
  {
    $attrs = array_merge([
      'data-toggle' => 'modal',
      'data-target' => $target,
    ], $extraAttrs);

    if ($url !== null) {
      $attrs['data-url'] = $url;
    }

    return [
      'icon' => $icon,
      'tooltip' => $tooltip,
      'url' => 'javascript:void(0)',
      'attrs' => $attrs,
      'btnType' => $btnType,
      'outline' => $outline,
      'disabled' => $disabled,
    ];
  }

  /**
   * Creates a dropdown button action with children.
   */
  public static function dropdown(string $tooltip, array $children, string $icon = null, string $btnType = 'white', bool $outline = true, $disabled = false): array
  {
    $icon = $icon ?: Iconify::getInstance()->icon('solar:tuning-3-bold-duotone', '', ['width' => 20, 'height' => 20]);
    return [
      'icon' => $icon,
      'tooltip' => $tooltip,
      'children' => $children,
      'btnType' => $btnType,
      'outline' => $outline,
      'disabled' => $disabled,
    ];
  }

  /**
   * Creates a dropdown menu item.
   */
  public static function item(string $label, string $url = 'javascript:void(0)', array $attrs = [], string $jsCallback = null, string $type = null, array $children = [], string $icon = null, $disabled = false): array
  {
    $item = [
      'label' => $label,
      'url' => $url,
      'disabled' => $disabled,
    ];
    if ($type !== null) {
      $item['type'] = $type;
    }
    if ($icon !== null) {
      $item['icon'] = $icon;
    }
    if (!empty($attrs)) {
      $item['attrs'] = $attrs;
    }
    if (!empty($children)) {
      $item['children'] = $children;
    }
    return $item;
  }

  /**
   * Creates a separator for dropdown menus.
   */
  public static function separator(): array
  {
    return ['separator' => true];
  }
}
