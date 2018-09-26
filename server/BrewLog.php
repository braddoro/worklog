<?php
require_once('../lib/DataModel.php');
$argsIN = array_merge($_POST,$_GET);

$allowedOperations = array('fetch','add','update','remove');
//if(isset($argsIN['userID']) && $argsIN['userID'] == 1) {
//	$allowedOperations = array('fetch','add');
//}

$params = array(
	'baseTable' => 'brewLog',
	'pk_col' => 'brewLogID',
	'allowedOperations' => $allowedOperations,
	'ini_file' => realpath('../lib/server.ini')
);
$lclass = New DataModel();
$lclass->init($params);
if($lclass->status != 0){
	$response = array('status' => $lclass->status, 'errorMessage' => $lclass->errorMessage);
	echo json_encode($response);
	exit;
}

$operationType = (isset($argsIN['operationType'])) ? $argsIN['operationType'] : null;
switch($operationType){
case 'fetch':
	$argsIN['sql'] = "SELECT brewLogID, userID, brewDate, beerName, beerStyle, type, mashTemp, mashRatio, mashTime, preboilSG, preboilVol, boilTime, postBoilSG, postBoilVol, finalSG, finalVol, yeastStarter, yeastStrain, fermTempStart, fermTempEnd, finishDate, lastChangeDate, round((postBoilSG - finalSG) * 131.25,1) AS ABV FROM brewLog where brewLogID = coalesce(:id, brewLogID)";
	$response = $lclass->pdoFetch($argsIN);
	break;
case 'add':
	$response = $lclass->pdoAdd($argsIN);
	break;
case 'update':
	$response = $lclass->pdoUpdate($argsIN);
	break;
case 'remove':
	$response = $lclass->pdoRemove($argsIN);
	break;
default:
	$response = array('status' => 0);
	break;
}
echo json_encode($response);
?>
