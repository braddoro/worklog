<?php
class Quote {
	public function getQuote() {
		$quote = '';
		$ini_file = 'lib/server.ini';
		if(!file_exists($ini_file)){
			$quote = 'The ini file was not found 1.';
			return $quote;
		}
		$server_array = parse_ini_file($ini_file,true);
		$dbhost = $server_array['database']['hostname'];
		$dbuser = $server_array['database']['username'];
		$dbpass = $server_array['database']['password'];
		$schema = $server_array['database']['dbname'];
		$sql = 'SELECT quote, attribution FROM quotes ORDER BY RAND() LIMIT 0,1;';
		$opt = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false
		];
		$conn = new PDO("mysql:host={$dbhost};dbname={$schema}", $dbuser, $dbpass, $opt);
		foreach ($conn->query($sql) as $row) {
			$quote = $row['quote'];
			$attribution = $row['attribution'];
			$quote .= (!is_null($attribution)) ? ' &ndash; ' . $attribution : '';
		}
		return $quote;
	}
}
?>
