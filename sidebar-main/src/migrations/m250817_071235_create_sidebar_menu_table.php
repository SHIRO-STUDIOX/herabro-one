<?php

use common\components\Env;
use hesabro\sidebar\helpers\HelperParams;
use hesabro\sidebar\Module;
use yii\db\Migration;

/**
 * Handles the creation of table `{{%sidebar_menu}}`.
 */
class m250817_071235_create_sidebar_menu_table extends Migration
{
    public function init(): void
    {
        $dbComponentName = HelperParams::getDbMasterComponent();
        if ($dbComponentName) {
            $this->db = Yii::$app->{$dbComponentName};
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%sidebar_menu}}', [
            'id' => $this->primaryKey(),
            'root' => $this->integer(),
            'lft' => $this->integer()->notNull(),
            'rgt' => $this->integer()->notNull(),
            'lvl' => $this->smallInteger(5)->notNull(),

            'name' => $this->string(100)->notNull(),
            'icon' => $this->string(50)->null(),
            'icon_type' => $this->smallInteger(1)->notNull()->defaultValue(2),

            'status' => $this->tinyInteger()->notNull()->defaultValue(1),
            'active' => $this->boolean()->notNull()->defaultValue(true),
            'child_allowed' => $this->boolean()->notNull()->defaultValue(true),
            'selected' => $this->boolean()->notNull()->defaultValue(false),
            'disabled' => $this->boolean()->notNull()->defaultValue(false),
            'readonly' => $this->boolean()->notNull()->defaultValue(false),
            'visible' => $this->boolean()->notNull()->defaultValue(true),
            'collapsed' => $this->boolean()->notNull()->defaultValue(true),
            'movable_u' => $this->boolean()->notNull()->defaultValue(true),
            'movable_d' => $this->boolean()->notNull()->defaultValue(true),
            'movable_l' => $this->boolean()->notNull()->defaultValue(true),
            'movable_r' => $this->boolean()->notNull()->defaultValue(true),
            'removable' => $this->boolean()->notNull()->defaultValue(true),
            'removable_all' => $this->boolean()->notNull()->defaultValue(false),

            'module' => $this->string(60)->null(),
            'keywords' => $this->json(),
            'url' => $this->string(255)->null(),
            'pinned' => $this->boolean()->notNull()->defaultValue(false),
            'description' => $this->text()->null(),
            'code' => $this->smallInteger()->unsigned()->null(),
            
            'created_at' => $this->integer()->unsigned(),
            'created_by' => $this->integer()->unsigned(),
            'updated_at' => $this->integer()->unsigned(),
            'updated_by' => $this->integer()->unsigned(),
            'deleted_at' => $this->integer()->unsigned(),
            
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%sidebar_menu}}');
    }
}
