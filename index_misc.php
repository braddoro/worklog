<?php
// https://mattstauffer.co/blog/sublime-text-3-for-php-developers
$ini_array  = parse_ini_file('misc.ini', true);
$skin = $ini_array['application']['skin'];;
$title = $ini_array['application']['title'];
$source_path = $ini_array['application']['source_path'];
$smart_ver = $ini_array['application']['smartclient_version'];
$client_path = $ini_array['application']['client_path'];
$server_path = $ini_array['application']['server_path'];
$shared_path = $ini_array['application']['shared_path'];
echo "<html>
<head>
<script>var isc = null;</script>
<script>var serverPath = '$server_path';</script>
<script>var isomorphicDir = '{$source_path}{$smart_ver}/smartclientRuntime/isomorphic/';</script>
<script src='{$source_path}{$smart_ver}/smartclientRuntime/isomorphic/system/modules/ISC_Core.js'></script>
<script src='{$source_path}{$smart_ver}/smartclientRuntime/isomorphic/system/modules/ISC_Foundation.js'></script>
<script src='{$source_path}{$smart_ver}/smartclientRuntime/isomorphic/system/modules/ISC_Containers.js'></script>
<script src='{$source_path}{$smart_ver}/smartclientRuntime/isomorphic/system/modules/ISC_Grids.js'></script>
<script src='{$source_path}{$smart_ver}/smartclientRuntime/isomorphic/system/modules/ISC_Forms.js'></script>
<script src='{$source_path}{$smart_ver}/smartclientRuntime/isomorphic/system/modules/ISC_DataBinding.js'></script>
<script src='{$source_path}{$smart_ver}/smartclientRuntime/isomorphic/skins/{$skin}/load_skin.js'></script>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
<title>$title</title>
</head>
<body>
<script>";
$html = "";
$content = '';
// Shared files.
//
$classes = array();
$classes[] = "ClassDefaults.js";
$classes[] = "library.js";
$classes[] = "ShowInfo.js";
foreach($classes as $class) {
	if(file_exists($shared_path . $class)){
		$content .= file_get_contents($shared_path . $class);
	}
}
echo $content;
// Application files.
$classes = array();
$classes[] = "BrewLog.js";
$classes[] = "Cards.js";
$classes[] = "Categories.js";
$classes[] = "ContextMenu.js";
$classes[] = "Desktop.js";
$classes[] = "HtmlViewer.js";
$classes[] = "Entry.js";
$classes[] = "Items.js";
$classes[] = "Lists.js";
$classes[] = "Login.js";
$classes[] = "Navigation.js";
$classes[] = "Projects.js";
$classes[] = "Quotes.js";
$classes[] = "Reports.js";
$classes[] = "Shared.js";
$classes[] = "ShowQuote.js";
$classes[] = "Statuses.js";
$classes[] = "Tasks.js";
$classes[] = "Users.js";
$classes[] = "Work.js";
$content = "";
foreach($classes as $class) {
	if(file_exists($client_path . $class)){
		$content .= file_get_contents($client_path . $class);
	} else {
		$html .= "File not found: {$class}.";
	}
}
require_once('server/GetQuote.php');
$lclass = New Quote();
$html .=  $lclass->getQuote();
echo $content;
echo "isc.Desktop.create({text: \"{$html}\"})";
echo '</script>
</body>
</html>';
?>
