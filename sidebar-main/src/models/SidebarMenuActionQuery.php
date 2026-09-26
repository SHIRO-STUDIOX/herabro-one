<?php

namespace hesabro\sidebar\models;

use yii\db\ActiveQuery;

class SidebarMenuActionQuery extends ActiveQuery
{

    public function active()
    {
        return $this->onCondition(['<>', SidebarMenuAction::tableName() . '.status', SidebarMenuAction::STATUS_DELETED]);
    }
}
