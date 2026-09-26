<?php

namespace hesabro\sidebar\controllers;

use common\components\ModuleItems;
use hesabro\helpers\traits\AjaxValidationTrait;
use hesabro\sidebar\helpers\HelperParams;
use hesabro\sidebar\models\SidebarMenu;
use hesabro\sidebar\models\SidebarMenuAction;
use hesabro\sidebar\models\SidebarMenuSearch;
use yii\filters\AccessControl;
use yii\rest\Controller;
use yii\web\Response;
use Yii;
use yii\caching\TagDependency;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use yii\web\UploadedFile;

class SidebarMenuController extends Controller
{
    use AjaxValidationTrait;

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['index', 'export-json', 'import-json', 'sync-faq'],
                        'allow' => true,
                        'roles' => [HelperParams::getManagerPermission() ?? '@'],
                    ],
                    [
                        'actions' => ['list', 'action', 'dropdown-list'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    public function actionIndex()
    {
        $searchModel = new SidebarMenuSearch();
        $params = Yii::$app->request->queryParams;
        $query = $searchModel->search($params);
        return $this->render(
            'index',
            ['model' => $searchModel, 'query' => $query]
        );
    }
    public function actionAction($id)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $sidebarMenu = $this->findModel($id);
        return $sidebarMenu->action;
    }

    public function actionDropdownList($query = null)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        if (empty($query)) {
            return ['results' => []];
        }

        $models = SidebarMenu::find()
            ->andWhere(['like', 'name', $query])
            ->limit(20)
            ->all();

        $results = [];

        foreach ($models as $model) {
            $results[] = [
                'id' => $model->key ?? $model->id,
                'text' => $model->createLink()
            ];
        }

        return ['results' => $results];
    }


    public function actionList()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $modules = Yii::$app->request->get('modules', []);
        $query = SidebarMenu::find()->withHasAction();
        if ($modules) {
            $query->andWhere(['module' => $modules]);
        }
        $elements = $query->orderBy(['root' => SORT_ASC, 'lft' => SORT_ASC])
            ->indexBy('id')
            ->all();

        $tree = $this->buildTree($elements);

        // Get use yii\filters\AccessController;
        $filters = [];
        foreach ($modules as $key) {
            if (($moduleFilters = ModuleItems::itemAlias('ModuleItemsFilter', $key))) {
                foreach ($moduleFilters as $key => $value) {
                    $filters[trim($key, '/')] = $value;
                }
            }
        }
        if (count($filters) == 0) {
            return $tree;
        }
        return $this->applyFilterOnTree($tree, $filters);
    }

    public function actionExportJson()
    {
        $query = SidebarMenu::find()
            ->joinWith(['action' => function ($q) {
                $q->select([
                    'id',
                    'sidebar_menu_id',
                    'api_schema',
                    'api_key',
                    'item_url_schema',
                    'item_url_key',
                    'placeholder',
                ]);
            }]);
        $elements = $query->orderBy(['root' => SORT_ASC, 'lft' => SORT_ASC])
            ->indexBy('id')
            ->all();
        $data = $this->buildTree($elements, true);
        $compactData = $this->compactJson($data);

        return Yii::$app->response->sendContentAsFile(
            json_encode($compactData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'sidebar-items.json',
            [
                'mimeType' => 'application/json',
                'inline' => false,
            ]
        );
    }

    public function actionImportJson()
    {
        $model = new SidebarMenu();
        $model->setScenario(SidebarMenu::SCENARIO_UPLOAD_JSON);
        if (($model->file = UploadedFile::getInstance($model, 'file'))) {
            if ($model->validate()) {
                $content = file_get_contents($model->file->tempName);
                $data = json_decode($content, true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    return $this->asJson([
                        'success' => false,
                        'msg' => Yii::t('app', 'فایل JSON معتبر نیست!')
                    ]);
                } else {
                    $db = Yii::$app->get(HelperParams::getDbMasterComponent() ?? 'db');
                    $transaction = $db->beginTransaction();
                    try {
                        $keys = SidebarMenu::find()->select('key')->column();
                        $numericKeys = array_filter($keys, 'is_numeric');
                        $startKey = !empty($numericKeys) ? max(array_map('intval', $numericKeys)) : 0;

                        SidebarMenuAction::deleteAll();
                        SidebarMenu::deleteAll();
                        $this->importTree($data, null, $startKey);
                        $transaction->commit();
                        Yii::$app->session->setFlash('success', 'اطلاعات با موفقیت آپلود شد.');
                        return $this->asJson([
                            'success' => true,
                            'msg' => Yii::t('app', 'Item Created')
                        ]);
                    } catch (\Exception $e) {
                        $transaction->rollBack();
                        Yii::error($e->getMessage(), __METHOD__);
                        return $this->asJson([
                            'success' => false,
                            'msg' => Yii::t('app', $e->getMessage())
                        ]);
                    }
                }
            } else {
                $errors = $model->getFirstErrors();
                $firstError = reset($errors);
                return $this->asJson([
                    'success' => false,
                    'msg' => Yii::t('app',  $firstError ?: 'آپلود فایل ناموفق بود!')
                ]);
            }
        } else {
            $this->performAjaxValidation($model);
            return $this->renderAjax('_upload', [
                'model' => $model,
            ]);
        }
        return $this->redirect(['index']);
    }

    private function compactJson(array $items)
    {
        $compactData = [];
        foreach ($items as $item) {
            $compactItem = [
                'name' => $item['name'],
                'key' => $item['key'] ?? null,
                'url' => $item['url'],
                'module' => $item['module'],
                'keywords' => $item['keywords'],
                'regex_prefix' => $item['regex_prefix'],
                'regex_items' => $item['regex_items'],
                'code' => $item['code'],
                'icon' => $item['icon']
            ];

            if (isset($item['items'])) {
                $compactItem['items'] = $this->compactJson($item['items']);
            }
            if (isset($item['action'])) {
                $compactItem['action'] = $item['action'];
            }

            $compactData[] = $compactItem;
        }
        return $compactData;
    }

    /**
     * @param SidebarMenu[] $elements
     * @return array
     */
    private function buildTree(array $elements, $withAction = false)
    {
        $tree = [];
        $nodes = [];
        foreach ($elements as $id => $element) {
            $nodeData = ArrayHelper::toArray($element);
            $nodeData['label'] = $nodeData['name'];
            $nodeData['items'] = [];

            if (!$withAction && isset($nodeData['icon']) && str_contains($nodeData['icon'], ':')) {
                $svgHtml = \hesabro\helpers\components\iconify\Iconify::getInstance()->icon($nodeData['icon']);
                if ($svgHtml) {
                    if (str_starts_with($svgHtml, '<span>') && str_ends_with($svgHtml, '</span>')) {
                        $svgHtml = substr($svgHtml, 6, -7);
                    }
                    $nodeData['icon'] = $svgHtml;
                }
            }

            if ($withAction && ($action = $element->action)) {
                $nodeData['action']['api_schema'] = $action->api_schema;
                $nodeData['action']['api_key'] = $action->api_key;
                $nodeData['action']['item_url_schema'] = $action->item_url_schema;
                $nodeData['action']['item_url_key'] = $action->item_url_key;
                $nodeData['action']['placeholder'] = $action->placeholder;
            }
            $nodes[$id] = $nodeData;
        }
        foreach ($nodes as $id => &$node) {
            $parentId = null;
            $parentLft = -1;

            foreach ($nodes as $pid => $parentCandidate) {
                if (
                    $id !== $pid &&
                    $node['root'] == $parentCandidate['root'] &&
                    $node['lft'] > $parentCandidate['lft'] &&
                    $node['rgt'] < $parentCandidate['rgt']
                ) {
                    if ($parentCandidate['lft'] > $parentLft) {
                        $parentLft = $parentCandidate['lft'];
                        $parentId = $pid;
                    }
                }
            }

            if ($parentId !== null) {
                $nodes[$parentId]['items'][] = &$node;
            } else {
                $tree[] = &$node;
            }
        }

        return $tree;
    }

    private function applyFilterOnTree(array $tree, array $filters)
    {
        $filteredTree = [];
        foreach ($tree as $item) {
            if (isset($item['items']) && is_array($item['items']) && !empty($item['items'])) {
                $filteredSubItems = $this->applyFilterOnTree($item['items'], $filters);
                if (!empty($filteredSubItems)) {
                    $item['items'] = $filteredSubItems;
                    $filteredTree[] = $item;
                }
            } else if (isset($item['url'])) {
                $route = trim($item['url'], '/');
                if ((array_key_exists($route, $filters) && $filters[$route] == true) || !array_key_exists($route, $filters)) {
                    $filteredTree[] = $item;
                }
            }
        }
        return $filteredTree;
    }

    private function importTree(array $elements, $parent = null, &$startKey = 0)
    {
        foreach ($elements as $element) {
            $menu = new SidebarMenu();
            $menu->setScenario(SidebarMenu::SCENARIO_CREATE);
            $menu->name = $element['name'] ?? null;
            $menu->icon = $element['icon'] ?? null;
            $menu->url = $element['url'] ?? null;
            $menu->module = $element['module'] ?? null;
            $menu->regex_prefix = $element['regex_prefix'] ?? null;
            $menu->regex_items = $element['regex_items'] ?? null;
            $menu->keywords = $element['keywords'] ?? null;
            $menu->code = $element['code'] ?? null;

            $key = $element['key'] ?? null;
            if (empty($key)) {
                $startKey++;
                $menu->key = $startKey;
            } else {
                $menu->key = $key;
                if (is_numeric($key) && (int)$key > $startKey) {
                    $startKey = (int)$key;
                }
            }

            if ($parent) {
                $menu->appendTo($parent);
            } else {
                $menu->makeRoot();
            }

            if (!$menu->save()) {
                $name = $menu->name ?? '';
                $url = $menu->url ?? '';
                $module = $menu->module ?? '';
                throw new \Exception('خطا در ذخیره سازی آیتم ' . $name . ' در ماژول ' . $module . ' با آدرس ' . $url . ': ' . implode(', ', $menu->getFirstErrors()));
            }

            if (!empty($element['action'])) {
                $action = new SidebarMenuAction();
                $action->setScenario(SidebarMenuAction::SCENARIO_CREATE);
                $action->sidebar_menu_id = $menu->id;
                $action->api_schema = $element['action']['api_schema'] ?? null;
                $action->api_key = $element['action']['api_key'] ?? null;
                $action->item_url_schema = $element['action']['item_url_schema'] ?? null;
                $action->item_url_key = $element['action']['item_url_key'] ?? null;
                $action->placeholder = $element['action']['placeholder'] ?? null;
                if (!$action->save()) {
                    throw new \Exception('خطا در ذخیره سازی اکشن: ' . implode(', ', $action->getFirstErrors()));
                }
            }

            if (!empty($element['items'])) {
                $this->importTree($element['items'], $menu, $startKey);
            }
        }
    }

    // public function actionSyncFaq()
    // {
    //     $modelIds = \hesabro\kb\models\ModuleFaqRelation::find()
    //         ->select('model_id')
    //         ->andWhere(['model_class' => SidebarMenu::class])
    //         ->column();

    //     $activeItems = SidebarMenu::find()->all();
    //     $deletedItems = SidebarMenu::findDeleted()
    //         ->andWhere(['id' => $modelIds])
    //         ->all();

    //     $deletedMap = [];
    //     foreach ($deletedItems as $item) {
    //         $name = trim($item->name);
    //         $url = trim($item->url);
    //         $module = trim($item->module);
    //         $mapLine = "{$name}|{$url}|{$module}";

    //         if (!isset($deletedMap[$mapLine]) || $item->id > $deletedMap[$mapLine]->id) {
    //             $deletedMap[$mapLine] = $item;
    //         }
    //     }

    //     $assignedKeys = [];
    //     $counter = 1;
    //     $updatedCount = 0;

    //     $db = Yii::$app->get(HelperParams::getDbMasterComponent() ?? 'db');
    //     $transaction = $db->beginTransaction();
    //     try {
    //         foreach ($activeItems as $activeItem) {
    //             $name = trim($activeItem->name);
    //             $url = trim($activeItem->url);
    //             $module = trim($activeItem->module);
    //             $mapLine = "{$name}|{$url}|{$module}";

    //             $keyToAssign = null;
    //             if (isset($deletedMap[$mapLine])) {
    //                 $candidateKey = $deletedMap[$mapLine]->id;
    //                 if (!in_array($candidateKey, $assignedKeys)) {
    //                     $keyToAssign = $candidateKey;
    //                 }
    //             }

    //             if ($keyToAssign === null) {
    //                 do {
    //                     $candidateKey = $counter;
    //                     $counter++;
    //                 } while (in_array($candidateKey, $assignedKeys));
    //                 $keyToAssign = $candidateKey;
    //             }

    //             $assignedKeys[] = $keyToAssign;
    //             if ($activeItem->key !== $keyToAssign) {
    //                 $activeItem->key = $keyToAssign;
    //                 if ($activeItem->save(false)) {
    //                     $updatedCount++;
    //                 }
    //             }
    //         }
    //         $transaction->commit();
    //         Yii::$app->session->setFlash('success', "تعداد {$updatedCount} کلید با موفقیت همگام‌سازی شد.");
    //     } catch (\Exception $e) {
    //         $transaction->rollBack();
    //         Yii::$app->session->setFlash('error', "خطا در همگام‌سازی: " . $e->getMessage());
    //     }

    //     return $this->redirect(['index']);
    // }

    protected function findModel($id)
    {
        if (($model = SidebarMenu::find()->andWhere(['id' => $id])->limit(1)->one()) !== null) {
            return $model;
        }

        throw new NotFoundHttpException(Yii::t('app', 'The requested page does not exist.'));
    }
}
