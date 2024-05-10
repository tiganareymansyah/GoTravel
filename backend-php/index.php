<?php
   require_once "config/header.php";

    try {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $paths = preg_split("/[\/]/", $uri, -1, PREG_SPLIT_NO_EMPTY);

        if (count($paths) < 2) throw new Exception('Invalid API Url');

        if ($paths[2] == "api") {
            if (empty($paths[3])) throw new Exception('API Url Not Found');
            require_once "routes.php";
        } else {
            throw new Exception('API Url Not Found');
        }
    } catch (Exception $e) {
        $arr = array("status" => "failed", "message" => $e->getMessage());
        echo json_encode($arr);
    }
?>