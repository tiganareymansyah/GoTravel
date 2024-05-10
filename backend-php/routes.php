<?php
    require_once "config/header.php";

    global $paths;
    global $result;

    try {
        if($paths[3] == "user") {
            include_once __DIR__ . '/controllers/logregController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] == "register") {
                $logregController = new LogregController();
                $data = $logregController->RegisterUser($jsonParams);

                $result['status'] = "success";
                $result['message'] = "Register Berhasil";
            } else if($paths[4] == "cek-cookie") {
                $logregController = new LogregController();
                $data = $logregController->CekCookie();

            } else if($paths[4] == "login") {
                $logregController = new LogregController();
                $data = $logregController->LoginUser($jsonParams);
                
                $result['status'] = "success";
                $result['message'] = "Login Berhasil";
                $result['data'] = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else {
            throw new Exception('Invalid Route');
        }

        echo json_encode($result);
    } catch (Exception $error) {
        $responseError = ["status" => "failed", "message" => $error->getMessage()];
        echo json_encode($responseError);
    }
?>