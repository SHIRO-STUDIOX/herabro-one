<?php

use hesabro\sidebar\helpers\HelperParams;
use yii\db\Migration;

/**
 * Handles the creation of table `{{%sidebar_menu_action}}`.
 */
class m250914_045609_create_sidebar_menu_action_table extends Migration
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
        $oldTableName = '{{%menu_item_action}}';
        if ($this->db->schema->getTableSchema($oldTableName, true) !== null) {
            echo('old table removed');
            $this->dropTable($oldTableName);
        }
        $this->createTable('{{%sidebar_menu_action}}', [
            'id' => $this->primaryKey(),
            'sidebar_menu_id' => $this->integer()->notNull(),
            'api_schema' => $this->string(256)->notNull(),
            'api_key' => $this->string(50),
            'placeholder' => $this->string(100),
            'status' => $this->tinyInteger()->notNull()->defaultValue(1),
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
        $this->dropTable('{{%sidebar_menu_action}}');
    }
}
