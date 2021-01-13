<?php
require_once 'Connect.php';
$table = 'lists';
$primaryKey = 'listID';
$sortColumn = 'listName';
$conn = new Connect();
$dbconn = $conn->conn();
if(!$dbconn->isConnected()){
    $response = array('status' => -1, 'errorMessage' => $dbconn->errorMsg());
    echo json_encode($response);
    exit(1);
}
$pkval = (isset($_REQUEST[$primaryKey])) ? intval($_REQUEST[$primaryKey]) : null;
$operationType = (isset($_REQUEST['operationType'])) ? $_REQUEST['operationType'] : 'fetch';
$where = '1=1';
switch($operationType){
case 'fetch':
    break;
case 'add':
    $data = array('table' => $table, 'primaryKey' => $primaryKey, 'newvals' => $_REQUEST);
    $record = $conn->buildRecordset($data);
    $dbconn->AutoExecute($table, $record, DB_AUTOQUERY_INSERT);
    $pkval = $dbconn->insert_Id();
    if($pkval == 0){
        $response = array('status' => -4, 'errorMessage' => $dbconn->errorMsg());
        echo json_encode($response);
        exit(-1);
    }
    $where = $primaryKey . '=' . $pkval;
    break;
case 'update':
    $data = array('table' => $table, 'primaryKey' => $primaryKey, 'newvals' => $_REQUEST);
    $record = $conn->buildRecordset($data);
    $where = $primaryKey . '=' . $pkval;
    $dbconn->AutoExecute($table, $record, DB_AUTOQUERY_UPDATE, $where);
    break;
case 'remove':
    $where = $primaryKey . '=' . $pkval;
    $sql = "delete from {$table} where {$where};";
    $dbconn->execute($sql);
    break;
default:
    break;
}
$sql = "select * from {$table} where {$where} order by {$sortColumn};";
$response = $dbconn->getAll($sql);
if(!$response){
    $response = array();
}
echo json_encode($response);
$dbconn->close();
