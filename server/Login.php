<?php
$argsIN = array_merge($_POST,$_GET);
$server_array  = parse_ini_file('../lib/server.ini',true);
$dbhost = $server_array['database']['hostname'];
$dbuser = $server_array['database']['username'];
$dbpass = $server_array['database']['password'];
$schema = $server_array['database']['dbname'];
$username = $argsIN['USER_NAME'];
$password = $argsIN['PASSWORD'];
$sql = "select * from users where login = '{$username}' and password = '{$password}' and active = 'Y'";
echo("/*" . $sql . "*/");
$mysqli = new mysqli($dbhost,$dbuser,$dbpass,$schema);
if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n",$mysqli->connect_error);
	exit();
}
if (!$result = $mysqli->query($sql)) {
	echo "Error: " . $mysqli->error . "\n";
	exit();
}
$rows = array();
$line = array();
$record = array();
while ($row = $result->fetch_object()) {
	$record = array();
	foreach($row as $key => $value){
		$line[$key] = $value;
		$record['name'] = $key;
		$record['value'] = $value;
		$record['type'] = 'text';
		//$rows[] = $record;
	}
	$rows[] = $line;
}
$result->free();
$mysqli->close();
echo json_encode($rows)
?>
