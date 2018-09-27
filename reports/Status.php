<!DOCTYPE html>
<html>
<head>
<title>Status Report</title>
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

if(isset($argsIN['u'])){
	$userid = intval($argsIN['u']);
}

if(isset($argsIN['s'])){
	$tmp = explode('-', $argsIN['s']);
	$startdate = (checkdate($tmp[1], $tmp[2], $tmp[0])) ? $argsIN['s'] : null;
}

if(isset($argsIN['e'])){
	$tmp = explode('-', $argsIN['e']);
	$enddate = (checkdate($tmp[1], $tmp[2], $tmp[0])) ? $argsIN['e'] : null;
}

$html = '<div class="title">Status Report '. "from $startdate to $enddate" . '</div><br/>' . PHP_EOL;
$params['ini_file'] = '../lib/server.ini';

$params['bind'] = array('userid' => $userid, 'startdate' => $startdate, 'enddate' => $enddate);
$lclass = New Reporter();
$params['title'] = 'Total';
$params['tooltip'] = 'Total';
$params['sql'] = '
	select
		sum(T.duration) Hours
	from tasks T
		inner join projects P on T.projectID = P.projectID
		inner join categories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate;';
$html .= $lclass->init($params);

$total = get_string_between($html,'<td>','</td>');

// $params['bind'] = array('userid' => $userid);
// $lclass = New Reporter();
// $params['title'] = 'Open Tasks';
// $params['tooltip'] = 'Tasks that I am currently working on.';
// $params['sql'] = '
// 	select
// 		P.projectCode,
// 		P.projectName,
// 		S.status,
// 		I.ticketKey,
// 		I.itemDate,
// 		I.item
// 	from Items I
// 	left join projects P
// 		on I.projectID = P.projectID
// 	left join statuses S
// 		on I.statusID = S.statusID
// 	where
// 		I.userID = :userid
// 	order by
// 		I.dueDate;';
// $html .= $lclass->init($params);

$params['bind'] = array('userid' => $userid, 'startdate' => $startdate, 'enddate' => $enddate);
$lclass = New Reporter();
$params['title'] = 'Work by Project';
$params['sql'] = '
	select
		P.projectCode,
		P.projectName,
		sum(T.duration) as Hours,
		CONCAT(round(round(sum(T.duration)/ ' . $total . ',3)*100,1), \'%\') Percent
	from tasks T
		inner join projects P on T.projectID = P.projectID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	group by
		P.projectCode,
		P.projectName
	order by
		P.projectCode,
		P.projectName;';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Working Behavior';
$params['sql'] = '
	select
		C.categoryName,
		sum(T.duration) as Hours,
		CONCAT(round(round(sum(T.duration)/ ' . $total . ',3)*100,1), \'%\') Percent
	from tasks T
		inner join categories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	group by
		C.categoryName
	order by
		C.categoryName;';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Administration Work Breakdown';
$params['sql'] = '
select
	P.projectCode,
	P.projectName,
	CONCAT(IFNULL(T.ticketKey,\'\'), \' \', IFNULL(T.description,\'\')) as Detail,
	sum(T.duration) as Hours,
	CONCAT(round(round(sum(T.duration)/ ' . $total . ',3)*100,1), \'%\') Percent
from tasks T
	inner join projects P on T.projectID = P.projectID
where
	userID = :userid
	and T.taskDate between :startdate and :enddate
	and P.projectCode = \'2018-1234\'
group by
	P.projectCode,
	P.projectName,
	CONCAT(IFNULL(T.ticketKey,\'\'), \' \', IFNULL(T.description,\'\'))
order by
	P.projectCode,
	P.projectName,
	CONCAT(IFNULL(T.ticketKey,\'\'), \' \', IFNULL(T.description,\'\'));';
$html .= $lclass->init($params);

$html .= '<hr><br/>';

$params['title'] = 'Daily';
$params['tooltip'] = 'Hours Worked by Day';
$params['sql'] = '
		select
			T.taskDate as Date,
			sum(T.duration) as Hours,
			CONCAT(round(round(sum(T.duration)/ ' . $total . ',3)*100,1), \'%\') Percent
		from tasks T
		where
			T.userID = :userid
			and T.taskDate between :startdate and :enddate
		group by
			T.taskDate
		order by
			T.taskDate;';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Tasks by Category and Project';
$params['sql'] = '
	select
		C.categoryName,
		P.projectCode,
		P.projectName,
		sum(T.duration) as Hours,
		CONCAT(round(round(sum(T.duration)/ ' . $total . ',3)*100,1), \'%\') Percent
	FROM tasks T
		inner join projects P on T.projectID = P.projectID
		inner join categories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	group by
		C.categoryName,
		P.projectCode,
		P.projectName
	order by
		C.categoryName,
		P.projectCode,
		P.projectName;';
$html .= $lclass->init($params);

$params['title'] = 'Tasks by Project and Category';
$params['sql'] = '
	select
		P.projectCode,
		P.projectName,
		C.categoryName,
		sum(T.duration) Hours,
		CONCAT(round(round(sum(T.duration)/ ' . $total . ',3)*100,1), \'%\') Percent
	from tasks T
		inner join projects P on T.projectID = P.projectID
		inner join categories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	group by
		P.projectCode,
		P.projectName,
		C.categoryName
	order by
		P.projectCode,
		P.projectName,
		C.categoryName;';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Tasks Detail';
$params['sql'] = '
	select
		T.taskDate,
		C.categoryName,
		T.duration,
		P.projectCode,
		P.projectName,
		T.ticketKey,
		T.description,
		T.lastChangeDate
	from tasks T
		inner join projects P on T.projectID = P.projectID
		inner join categories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	order by
		T.taskDate;';
$html .= $lclass->init($params);

echo $html;
?>
</body>
</html>
