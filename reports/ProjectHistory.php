<!DOCTYPE html>
<html>
<head>
<title>Project History</title>
<link rel="stylesheet" type"text/css" href="reports.css">
</head>
<body>
<?php
function get_string_between($string, $start, $end){
    $string = " ".$string;
     $ini = strpos($string,$start);
     if ($ini == 0) return "";
     $ini += strlen($start);
     $len = strpos($string,$end,$ini) - $ini;
     return substr($string,$ini,$len);
}

require_once('Reporter.php');
$argsIN = array_merge($_POST,$_GET);

// if(isset($argsIN['u'])){
// 	$userid = intval($argsIN['u']);
// }

// if(isset($argsIN['s'])){
// 	$tmp = explode('-', $argsIN['s']);
// 	$startdate = (checkdate($tmp[1], $tmp[2], $tmp[0])) ? $argsIN['s'] : null;
// }

// if(isset($argsIN['e'])){
// 	$tmp = explode('-', $argsIN['e']);
// 	$enddate = (checkdate($tmp[1], $tmp[2], $tmp[0])) ? $argsIN['e'] : null;
// }

$html = '<div class="title">Project History Report for Redis'. '</div><br/>' . PHP_EOL;
// $html = '<div class="title">Status Report '. "from $startdate to $enddate" . '</div><br/>' . PHP_EOL;
$params['ini_file'] = '../lib/server.ini';

// Total Work
//
$params['bind'] = array('userID' => 1, 'taskDate' => 2018, 'projectID' => 21);
$lclass = New Reporter();
$params['title'] = 'Project History';
$params['tooltip'] = 'Total';
$params['sql'] = "
select
    month(T.taskDate) Month,
    week(T.taskDate) Week,
	P.projectName,
    sum(T.duration) Hours,
    min(T.taskDate) Start,
    max(T.taskDate) End

from tasks T
	inner join projects P on T.projectID = P.projectID
	inner join categories C on T.taskCategoryID = C.categoryID
where
	T.userID = :userID
    and T.projectID = :projectID
	and year(T.taskDate) = :taskDate
group by
	P.projectName,
    month(T.taskDate),
    week(T.taskDate)
order by
    month(T.taskDate),
    week(T.taskDate),
	P.projectName;";
$html .= $lclass->init($params);

$total = get_string_between($html,'<td>','</td>');

// Work by Project Code
//
$params['bind'] = array('userID' => 1, 'taskDate' => 2018, 'projectID' => 21);
$lclass = New Reporter();
$params['title'] = 'Project History by Category';
$params['sql'] = "
select
    month(T.taskDate) Month,
    week(T.taskDate) Week,
	P.projectName,
    C.categoryName,
    sum(T.duration) Hours,
    min(T.taskDate) Start,
    max(T.taskDate) End
from tasks T
	inner join projects P on T.projectID = P.projectID
	inner join categories C on T.taskCategoryID = C.categoryID
where
	T.userID = :userID
    and T.projectID = :projectID
	and year(T.taskDate) = :taskDate
group by
    month(T.taskDate),
    week(T.taskDate),
	P.projectName,
	C.categoryName
order by
    month(T.taskDate),
    week(T.taskDate),
	P.projectName,
    C.categoryName;";
$html .= $lclass->init($params);

echo $html;
?>
</body>
</html>
