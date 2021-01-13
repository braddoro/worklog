<!DOCTYPE html>
<html>
<body>
<head>
<title>Open Tasks</title>
<link rel="stylesheet" type"text/css" href="reports.css">
</head>
<body>
<?php
require_once('Reporter.php');
$argsIN = array_merge($_POST,$_GET);
if(isset($argsIN['u'])){
	$userid = intval($argsIN['u']);
}
$html = '';
$params['bind'] = array('userid' => $userid);
$params['ini_file'] = '../../lib/server.ini';

$lclass = New Reporter();
$params['title'] = 'Open Tasks';
$params['sql'] = '
	select
	P.projectCode,
	P.projectName,
	S.status,
	I.ticketKey,
	I.itemDate,
	I.item
	from Items I
	left join projects P on I.projectID = P.projectID
	left join statuses S on I.statusID = S.statusID
	where I.userID = :userid
	order by I.itemDate, S.status, P.projectCode;';
$html .= $lclass->init($params);

echo $html;
?>
</body>
</html>
