<?php

use hesabro\sidebar\helpers\HelperParams;
use yii\db\Migration;

/**
 * Class m260620_134000_add_key_column_to_sidebar_menu_table
 */
class m260620_134000_add_key_column_to_sidebar_menu_table extends Migration
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
        $this->addColumn('{{%sidebar_menu}}', 'key', $this->integer()->unsigned()->after('id')->null()->comment('هر لینک جدید مربوط به کدام لینک حذف شده است.'));
        $this->createIndex('idx-unique-sidebar_menu-key', '{{%sidebar_menu}}', 'key', true);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('idx-unique-sidebar_menu-key', '{{%sidebar_menu}}');
        $this->dropColumn('{{%sidebar_menu}}', 'key');
    }
}
