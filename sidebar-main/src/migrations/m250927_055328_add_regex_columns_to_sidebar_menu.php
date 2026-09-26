<?php

use yii\db\Migration;

/**
 * Class m250927_055328_add_regex_column_to_sidebar_menu
 */
class m250927_055328_add_regex_columns_to_sidebar_menu extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%sidebar_menu}}', 'regex_prefix', $this->string(100)->after('name')->null());
        $this->addColumn('{{%sidebar_menu}}', 'regex_items', $this->string(500)->after('regex_prefix')->null());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('{{%sidebar_menu}}', 'regex_prefix');
        $this->dropColumn('{{%sidebar_menu}}', 'regex_items');
    }

}
