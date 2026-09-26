<div class="link-option">
    <?php if ($content): ?>
        <?= $content ?>
    <?php else: ?>
        <?php
        $linkClasses = 'pnd-d-flex pnd-align-items-center pnd-flex-grow-1';
        if (!empty($props) && is_array($props)) {
            if (isset($props['class'])) {
                $props['class'] = 'link-option-text ' . $linkClasses . ' ' . trim($props['class']);
            } else {
                $props['class'] = 'link-option-text ' . $linkClasses;
            }
        } else {
            $props = ['class' => 'link-option-text ' . $linkClasses];
        }
        $attr = '';
        foreach ($props as $key => $value) {
            $attr .= ' ' . htmlspecialchars($key);
            if ($value !== '') {
                $attr .= '="' . htmlspecialchars($value) . '"';
            }
        }
        ?>
        <div class="pnd-d-flex pnd-justify-between pnd-w-100 pnd-align-items-center">
            <a href="<?= $mode == 'link' ? $url : 'javascript:void(0)' ?>" <?= $attr ?>>
                <?php if ($icon): ?>
                    <span class="link-option-icon <?= $icon ?>"></span>
                <?php endif; ?>
                <span class="link-option-content">
                    <?= $text ?>
                    <?php if ($shortKey): ?>
                        <span class="shortkey"><?= '(' . $shortKey . ')' ?></span>
                    <?php endif; ?>
                </span>
            </a>
            <?php if ($action): ?>
                <?php
                $attr = '';
                $cls = 'link-option-action pnd-d-flex pnd-align-items-center pnd-justify-content-center';
                if (array_key_exists('props', $action)) {
                    if (array_key_exists('class', $action['props'])){
                        $cls = $cls . ' ' . $action['props']['class'];
                    }
                    foreach ($action['props'] as $key => $value) {
                        if ($key == 'class') {
                            continue;
                        }
                        $attr .= ' ' . htmlspecialchars($key);
                        if ($value !== '') {
                            $attr .= '="' . htmlspecialchars($value) . '"';
                        }
                    }
                }
                ?>
                <a class="<?= $cls ?>" href="<?= $action['url'] ?? 'javascript:void(0)' ?>"  <?= $attr ?>>
                    <i class="<?= $action['icon'] ?>"></i>
                </a>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</div>