<?php

namespace hesabro\sidebar\models;

class SidebarMenuSearch extends SidebarMenu
{
    public $withHasAction = false;
    public $module;
    public function rules()
    {
        return [

            [['id', 'parent_id'], 'integer'],
            ['withHasAction', 'boolean'],
            ['module', 'safe']
        ];
    }

    public function search($params)
    {
        $this->load($params);
        $query = SidebarMenu::find()->orderBy(['root'=>SORT_ASC, 'lft'=>SORT_ASC]);
        $query->andFilterWhere(['module' => $this->module]);

        if ($this->withHasAction) {
            $query->withHasAction();
        }
        return $query;
    }
}
