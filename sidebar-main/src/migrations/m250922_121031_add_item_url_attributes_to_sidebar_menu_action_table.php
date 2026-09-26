<?php

use yii\db\Migration;

/**
 * Class m250922_121031_add_item_url_attributes_to_sidebar_menu_action_table
 */
class m250922_121031_add_item_url_attributes_to_sidebar_menu_action_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%sidebar_menu_action}}', 'item_url_schema', $this->string(256)->notNull()->after('api_key'));
        $this->addColumn('{{%sidebar_menu_action}}', 'item_url_key', $this->string(50)->after('item_url_schema')->defaultValue('id'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('{{%sidebar_menu_action}}', 'item_url_key');
        $this->dropColumn('{{%sidebar_menu_action}}', 'item_url_schema');
    }
}
