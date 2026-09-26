<?php

namespace hesabro\sidebar\models;

use hesabro\sidebar\helpers\HelperParams;
use kartik\tree\models\Tree;
use Yii;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\caching\TagDependency;
use yii\helpers\Url;

class SidebarMenu extends Tree
{
    public ?int $has_action = null;

    const STATUS_ACTIVE = 1;
    const STATUS_DELETED = 0;

    const SCENARIO_CREATE = "create";
    const SCENARIO_UPDATE = "update";
    const SCENARIO_DELETE = "delete";
    const SCENARIO_UPLOAD_JSON = "upload-json";

    public $file = null;

    public static function getDb()
    {
        $dbComponent = HelperParams::getDbMasterComponent();

        if ($dbComponent === null) {
            return parent::getDb();
        }

        return Yii::$app->get($dbComponent);
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%sidebar_menu}}';
    }

    public function rules()
    {
        return [
            [['url'], 'string', 'max' => 255],
            [['name'], 'string', 'max' => 100],
            [['icon'], 'string', 'max' => 255],
            [['module'], 'string', 'max' => 60],
            [['regex_prefix'], 'string', 'max' => 100, 'skipOnEmpty' => true],
            [['regex_items'], 'string', 'max' => 500, 'skipOnEmpty' => true],
            [['key'], 'integer'],
            [['key'], 'default', 'value' => null],
            [['key'], 'unique'],
            [['name', 'module'], 'required', 'on' => [self::SCENARIO_CREATE, self::SCENARIO_UPDATE]],
            [['file'], 'required', 'on' => [self::SCENARIO_UPLOAD_JSON]],
            [['file'], 'file', 'extensions' => 'json', 'checkExtensionByMimeType' => false],
            [['file'], 'file', 'maxSize' => 1 * 1024 * 1024], # 1MB
            ['url', 'required', 'when' => function ($model) {
                return (!$model->isNewRecord && $model->isLeaf());
            }, 'on' => self::SCENARIO_UPDATE],
        ];
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_CREATE] = ['url', 'name', 'icon', 'module', 'regex_prefix', 'regex_items', 'key'];
        $scenarios[self::SCENARIO_UPDATE] = ['!id', 'url', 'name', 'icon', 'module', 'regex_prefix', 'regex_items', 'key'];
        $scenarios[self::SCENARIO_DELETE] = ['id'];
        $scenarios[self::SCENARIO_UPLOAD_JSON] = ['file'];
        return $scenarios;
    }

    public function getAction()
    {
        return $this->hasOne(SidebarMenuAction::class, ['sidebar_menu_id' => 'id']);
    }

    public static function find()
    {
        $query = new SidebarMenuQuery(get_called_class());
        return $query->active();
    }

    public static function findDeleted()
    {
        $query = new SidebarMenuQuery(get_called_class());
        return $query->onCondition([self::tableName() . '.active' => self::STATUS_DELETED]);
    }

    public static function generateNextKey()
    {
        $keys = parent::find()
            ->select(['key'])
            ->where(['is not', 'key', null])
            ->column();
        $numericKeys = array_filter($keys, 'is_numeric');
        $maxKey = !empty($numericKeys) ? max(array_map('intval', $numericKeys)) : 0;
        return (int) ($maxKey + 1);
    }

    public function beforeValidate()
    {
        if (parent::beforeValidate()) {
            if (empty($this->key)) {
                $this->key = self::generateNextKey();
            }
            return true;
        }
        return false;
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        if ($this->scenario == self::SCENARIO_DEFAULT) {
            if ($this->isNewRecord) {
                $this->setScenario(self::SCENARIO_CREATE);
            } else {
                $this->setScenario(self::SCENARIO_UPDATE);
            }
        }
        $db = Yii::$app->get(HelperParams::getDbMasterComponent() ?? 'db');
        $transaction = $db->beginTransaction();
        try {
            if (!parent::save($runValidation, $attributeNames)) {
                $transaction->rollBack();
                return false;
            }
        
            $actionData = Yii::$app->request->post('SidebarMenuAction');
            if ($actionData !== null && $actionData['setAction'] == true && $this->active != self::STATUS_DELETED) {
                $actionModel = $this->action ?? new SidebarMenuAction();
                if ($this->isNewRecord) {
                    $actionModel->setScenario(SidebarMenuAction::SCENARIO_CREATE);
                } else {
                    $actionModel->setScenario(SidebarMenuAction::SCENARIO_UPDATE);
                }
                $actionModel->sidebar_menu_id = $this->id;
                if (!$actionModel->load($actionData, '') || !$actionModel->save()) {
                    $this->addErrors($actionModel->getErrors());
                    $transaction->rollBack();
                    return false;
                }
            }
            if ($this->active == self::STATUS_DELETED && ($actionModel = $this->action)) {
                if (!$actionModel->softDelete()) {
                    $transaction->rollBack();
                    return false;
                }
            }
            $transaction->commit();
            return true;
        } catch (\Exception $e) {
            $transaction->rollBack();
            throw $e;
        } catch (\Throwable $e) {
            $transaction->rollBack();
            throw $e;
        }
    }

    public function afterSave($insert, $changedAttributes)
    {
        parent::afterSave($insert, $changedAttributes);
        TagDependency::invalidate(Yii::$app->cache, self::class);
    }

    public function afterDelete()
    {
        parent::afterDelete();
        TagDependency::invalidate(Yii::$app->cache, self::class);
    }


    public function fields()
    {
        $fields = parent::fields();
        $fields[] = 'has_action';
        return $fields;
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'key' => 'کلید ارتباطی',
            'module' => Yii::t('app', 'Module'),
            'name' => Yii::t('app', 'Name'),
            'icon' => Yii::t('app', 'Icon'),
            'icon_type' => 'نوع آیکون',
            'active' => Yii::t('app', 'Active'),
            'readonly' => 'فقط خواندنی',
            'disabled' => 'غیرفعال',
            'removable' => 'قابل حذف',
            'url' => "آدرس",
            'regex_prefix' => 'پیشوند جستجوی عبارت منظم (regex)',
            'regex_items' => 'گزینه های  جستجوی عبارت منظم (regex)',
            'file' => 'فایل'
        ];
    }

    public function getParent()
    {
        return $this->parents(1)->one();
    }

    /**
     * @return mixed|string|null
     */
    public function getFullName()
    {
        $name = $this->name;
        if (($parent = $this->parent)) {
            $name = $parent->fullName . ' >> ' . $name;
        }
        return $name;
    }

    public function createLink()
    {
        $module = HelperParams::getModules()[$this->module] ?? null;
        $url = Url::to([$this->url], true);
        $link = "<a target='_blank' href='" . $url . "'>";
        if ($module) {
            $link .= '<span class="badge badge-success mr-2">' . $module . "</span>";
        }
        $link .= $this->fullName . "</a>";
        return $this->url ? $link : $this->name;
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['timestamp'] = [
            'class' => TimestampBehavior::class,
        ];

        $behaviors['blameable'] = [
            'class' => BlameableBehavior::class,
            'createdByAttribute' => 'created_by',
            'updatedByAttribute' => 'updated_by',
        ];
        return $behaviors;
    }

    protected function buildRouteRegex($actions)
    {
        if (!$this->url) {
            return null;
        }
        $parts = explode('/', trim($this->url, '/'));
        array_pop($parts);
        $base = implode('/', $parts);
        $actionsRegex = implode('|', $actions);
        return "^{$base}/({$actionsRegex})(/.*|\\?.*)?$";
    }
}
