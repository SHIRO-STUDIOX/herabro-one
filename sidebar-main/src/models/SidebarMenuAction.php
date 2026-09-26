<?php

namespace hesabro\sidebar\models;

use hesabro\sidebar\helpers\HelperParams;
use PhpOffice\PhpSpreadsheet\Calculation\Logical\Boolean;
use Yii;
use yii2tech\ar\softdelete\SoftDeleteBehavior;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

class SidebarMenuAction extends ActiveRecord
{
    const STATUS_ACTIVE = 1;
    const STATUS_DELETED = 0;

    const SCENARIO_CREATE = "create";
    const SCENARIO_UPDATE = "update";
    const SCENARIO_DELETE = "delete";

    public ?bool $setAction = false;

    public function rules()
    {
        return [
            [['setAction'], 'boolean'],
            [['api_schema', 'item_url_schema'], 'string', 'max' => 255],
            [['api_key', 'item_url_key'], 'string', 'max' => 50],
            [['placeholder'], 'string', 'max' => 100],
            [
                ['sidebar_menu_id', 'api_key', 'item_url_key', 'api_schema', 'item_url_schema', 'placeholder'],
                'required',
                'on' => [self::SCENARIO_CREATE, self::SCENARIO_UPDATE],
                'when' => function ($model) {
                    return $model->setAction;
                },
            ],
            [['sidebar_menu_id'], 'integer'],
            [
                ['sidebar_menu_id'],
                'exist',
                'targetClass' => SidebarMenu::class,
                'targetAttribute' => ['sidebar_menu_id' => 'id']
            ],

        ];
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_CREATE] = ['setAction', 'api_schema', 'item_url_schema', 'api_key', 'item_url_key', 'placeholder'];
        $scenarios[self::SCENARIO_UPDATE] = ['!id', 'setAction', 'api_schema', 'item_url_schema', 'api_key', 'item_url_key', 'placeholder'];
        $scenarios[self::SCENARIO_DELETE] = ['id'];
        return $scenarios;
    }

    /**
     * return true if user can delete item
     * @return bool
     */
    public function canDelete()
    {
        return true;
    }

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
        return '{{%sidebar_menu_action}}';
    }

    /**
     * {@inheritdoc}
     * @return CategoryQuery the active query used by this AR class.
     */
    public static function find()
    {
        $query = new SidebarMenuActionQuery(get_called_class());
        return $query->active();
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'url' => Yii::t('app', 'Url'),
            'api_schema' => 'ساختار API',
            'item_url_schema' => 'ساختار آدرس هر آیتم',
            'api_key' => 'کلید API',
            'item_url_key' => 'کلید آدرس هر آیتم',
            'placeholder' => 'متن راهنما',
        ];
    }

    public function behaviors()
    {
        return [
            'timestamp' => [
                'class' => TimestampBehavior::class
            ],
            [
                'class' => BlameableBehavior::class,
                'createdByAttribute' => 'created_by',
                'updatedByAttribute' => 'updated_by',
            ],
            'softDeleteBehavior' => [
                'class' => SoftDeleteBehavior::class,
                'softDeleteAttributeValues' => [
                    'deleted_at' => time(),
                    'status' => self::STATUS_DELETED
                ],
                'restoreAttributeValues' => [
                    'deleted_at' => 0,
                    'status' => self::STATUS_ACTIVE
                ],
                'replaceRegularDelete' => false,
                'invokeDeleteEvents' => true
            ],
        ];
    }
}
