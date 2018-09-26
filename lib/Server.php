<?php
ini_set('display_errors', 1);
ini_set('log_errors', 1);
require_once('library.php');
class Server {
	private $conn = '';
	private $hostname = '';
	private $username = '';
	private $password = '';
	private $dbname = '';
	public function connect($params = NULL) {
		if(isset($params['ini_file'])){
			if(file_exists($params['ini_file'])){
				$ini_array = parse_ini_file($params['ini_file'], true);
			}
		}
		if(!isset($ini_array)){
			$ini_array = parse_ini_file('server.ini', true);
		}
		$this->hostname = $ini_array['database']['hostname'];
		$this->username = $ini_array['database']['username'];
		$this->password = $ini_array['database']['password'];
		$this->dbname = $ini_array['database']['dbname'];
 		try{
			$opt = [
				PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
				PDO::ATTR_EMULATE_PREPARES   => false
			];
			$this->conn = new PDO("mysql:host={$this->hostname};dbname={$this->dbname}", $this->username, $this->password, $opt);
 		}
		catch(PDOException $e){
			$return['status'] = -1;
			$return['errorMessage'] = parseArray($e);
			return $return;
		}
		return $this->conn;
	}
}
?>
