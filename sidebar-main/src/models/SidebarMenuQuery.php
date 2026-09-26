<?php

namespace hesabro\sidebar\models;

use yii\db\ActiveQuery;
use yii\db\Expression;

class SidebarMenuQuery extends ActiveQuery
{

    public function active()
    {
        return $this->onCondition(['<>', SidebarMenu::tableName() . '.active', SidebarMenu::STATUS_DELETED]);
    }

    public function withHasAction()
    {
        $sidebarMenuTable = SidebarMenu::tableName();
        $actionModel = new \hesabro\sidebar\models\SidebarMenuAction();

        $subQuery = $actionModel->find()
            ->andWhere("sidebar_menu_id = {$sidebarMenuTable}.id");

        return $this->addSelect([
            "{$sidebarMenuTable}.*",
            new Expression("EXISTS({$subQuery->createCommand()->getRawSql()}) AS has_action")
        ]);
    }
}
