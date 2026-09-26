<?php
namespace hesabro\sidebar\controllers;

use hesabro\sidebar\helpers\HelperParams;
use hesabro\sidebar\models\SidebarMenu;
use hesabro\sidebar\models\SidebarMenuAction;
use yii\filters\AccessControl;
use yii\rest\Controller;
use Yii;
use yii\web\NotFoundHttpException;

class SidebarMenuActionController extends Controller
{

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                        'actions' => ['delete']
                    ],
                ],
            ],
        ];
    }

    public function actionDelete($id)
    {
        $model = $this->findModel($id);
        $model->setScenario(SidebarMenuAction::SCENARIO_DELETE);
        $db = Yii::$app->get(HelperParams::getDbMasterComponent() ?? 'db');
        $transaction = $db->beginTransaction();

        try {
            if ($model->canDelete() && $model->validate() && $model->softDelete()) {
                $transaction->commit();
                $result = [
                    'status' => true,
                    'message' => Yii::t("app", "Item Deleted")
                ];
            } else {
                $transaction->rollBack();
                if ($model->hasErrors()) {
                    $errorString = implode('\n', $model->getFirstErrors());
                } else {
                    $errorString = Yii::t("app", "Error In Delete Item");
                }

                $result = [
                    'status' => false,
                    'message' => $errorString
                ];
            }
        } catch (\Exception $e) {
            $transaction->rollBack();
            $result = [
                'status' => false,
                'message' => Yii::t("app", "Error In Delete Item")
            ];
        }
        return $this->asJson($result);
    }

    protected function findModel($id)
    {
        if (($model = SidebarMenuAction::find()->andWhere(['id' => $id])->limit(1)->one()) !== null) {
            return $model;
        }

        throw new NotFoundHttpException(Yii::t('app', 'The requested page does not exist.'));
    }
}
