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
        } else if($paths[3] == "admin") {
            include_once __DIR__ . '/controllers/logregController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] == "register") {
                $logregController = new LogregController();
                $data = $logregController->RegisterAdmin($jsonParams);

                $result['status'] = "success";
                $result['message'] = "Register Berhasil";
            } else if($paths[4] == "login") {
                $logregController = new LogregController();
                $data = $logregController->LoginAdmin($jsonParams);
                
                $result['status'] = "success";
                $result['message'] = "Login Berhasil";
                $result['data'] = $data;
            }
        } else if($paths[3] === "transportation") {
            include_once __DIR__ . '/controllers/transportationController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "insert") {
                $transportationController = new TransportationController();
                $data = $transportationController->InsertTransportation($jsonParams);
                
                $result['status'] = "success";
                $result['message'] = "Data transportasi berhasil ditambahkan";
            } else if($paths[4] === "get-option") {
                $transportationController = new TransportationController();
                $data = $transportationController->GetOptionTransportation($jsonParams);
                
                $result['status'] = "success";
                $result['data'] = $data;
            }
        } else if($paths[3] === "destination") {
            include_once __DIR__ . '/controllers/destinationController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "insert") {
                $destinationController = new DestinationController();
                $data = $destinationController->InsertDestination($jsonParams);
                
                $result['status'] = "success";
                $result['message'] = "Data destinasi berhasil ditambahkan";
            } else if($paths[4] === "get-option") {
                $destinationController = new DestinationController();
                $data = $destinationController->GetOptionDestination($jsonParams);
                
                $result['status'] = "success";
                $result['data'] = $data;
            }
        } else if($paths[3] === "paymeth") {
            include_once __DIR__ . '/controllers/paymentMethodController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "insert") {
                $paymentMethodController = new PaymentMethodController();
                $data = $paymentMethodController->InsertPaymentMethod($jsonParams);
                
                $result['status'] = "success";
                $result['message'] = "Data payment method berhasil ditambahkan";
            } else if($paths[4] === "get-option") {
                $paymentMethodController = new PaymentMethodController();
                $data = $paymentMethodController->GetOptionPaymentMethod($jsonParams);
                
                $result['status'] = "success";
                $result['data'] = $data;
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
