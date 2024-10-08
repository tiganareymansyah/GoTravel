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

                $result = $data;
            } else if($paths[4] == "cek-cookie") {
                $logregController = new LogregController();
                $data = $logregController->CekCookie();

            } else if($paths[4] == "login") {
                $logregController = new LogregController();
                $data = $logregController->LoginUser($jsonParams);
                
                $result = $data;
            } else if($paths[4] == "otp") {
                $logregController = new LogregController();
                $data = $logregController->ValidationOtp($jsonParams);
                
                $result = $data;
            } else if($paths[4] == "edit") {
                $logregController = new LogregController();

                $data = $_POST;
                $image = $_FILES['image'];

                $result = $logregController->EditUser($data, $image);
            } else if($paths[4] == "get-data-user-by-email") {
                $urlParams = $_GET['email'];

                $logregController = new LogregController();
                $data = $logregController->GetDataUserByEmail($urlParams);
                
                $result = $data;
            } else if($paths[4] === "delete") {
                $urlParams = $_GET['id'];

                $logregController = new LogregController();
                $data = $logregController->DeleteFotoProfil($urlParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else if($paths[3] == "admin") {
            include_once __DIR__ . '/controllers/logregController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] == "register") {
                $logregController = new LogregController();
                $data = $logregController->RegisterAdmin($jsonParams);

                $result = $data;
            } else if($paths[4] == "login") {
                $logregController = new LogregController();
                $data = $logregController->LoginAdmin($jsonParams);
                
                $result = $data;
            } else if($paths[4] == "get-akun-admin") {
                $logregController = new LogregController();
                $data = $logregController->GetAkunAdmin($jsonParams);
                
                $result = $data;
            } else if($paths[4] == "edit") {
                $logregController = new LogregController();
                $data = $logregController->EditAdmin($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "delete") {
                $urlParams = $_GET['id'];

                $logregController = new LogregController();
                $data = $logregController->DeleteAdmin($urlParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else if($paths[3] === "transportation") {
            include_once __DIR__ . '/controllers/transportationController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "insert") {
                $transportationController = new TransportationController();
                $data = $transportationController->InsertTransportation($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "get-option") {
                $transportationController = new TransportationController();
                $data = $transportationController->GetOptionTransportation($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "edit") {
                $transportationController = new TransportationController();
                $data = $transportationController->EditTransportation($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "delete") {
                $urlParams = $_GET['id'];

                $transportationController = new TransportationController();
                $data = $transportationController->DeleteTransportation($urlParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else if($paths[3] === "destination") {
            include_once __DIR__ . '/controllers/destinationController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "insert") {
                $destinationController = new DestinationController();
                $data = $destinationController->InsertDestination($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "get-option") {
                $destinationController = new DestinationController();
                $data = $destinationController->GetOptionDestination($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "edit") {
                $destinationController = new DestinationController();
                $data = $destinationController->EditDestination($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "delete") {
                $urlParams = $_GET['id'];

                $destinationController = new DestinationController();
                $data = $destinationController->DeleteDestination($urlParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else if($paths[3] === "paymeth") {
            include_once __DIR__ . '/controllers/paymentMethodController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "insert") {
                $paymentMethodController = new PaymentMethodController();
                $data = $paymentMethodController->InsertPaymentMethod($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "get-option") {
                $paymentMethodController = new PaymentMethodController();
                $data = $paymentMethodController->GetOptionPaymentMethod($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "get-kode-payment") {
                $paymentMethodController = new PaymentMethodController();
                $data = $paymentMethodController->GetKodePayment();
                
                $result = $data;
            } else if($paths[4] === "edit") {
                $paymentMethodController = new PaymentMethodController();
                $data = $paymentMethodController->EditPaymentMethod($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "delete") {
                $urlParams = $_GET['id'];

                $paymentMethodController = new PaymentMethodController();
                $data = $paymentMethodController->DeletePaymentMethod($urlParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else if($paths[3] === "request") {
            include_once __DIR__ . '/controllers/dataBookingController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "add-data-booking") {
                $dataBookingController = new DataBookingController();
                $data = $dataBookingController->AddDataBooking($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "get-data-booking-by-email") {
                $urlParams = $_GET['email'];

                $dataBookingController = new DataBookingController();
                $data = $dataBookingController->GetDataBookingByEmail($urlParams);
                
                $result = $data;
            } else if($paths[4] === "get-all-data-booking") {
                $dataBookingController = new DataBookingController();
                $data = $dataBookingController->GetDataBooking($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "edit-pay") {
                $dataBookingController = new DataBookingController();
                $data = $dataBookingController->EditPay($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "delete") {
                $dataBookingController = new DataBookingController();
                $data = $dataBookingController->DeleteDataBooking($jsonParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else if($paths[3] === "contact") {
            include_once __DIR__ . '/controllers/contactController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "add-message") {
                $contactController = new ContactController();
                $data = $contactController->AddMessage($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "add-answer") {
                $contactController = new ContactController();
                $data = $contactController->AddAnswer($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "get-data") {
                $contactController = new ContactController();
                $data = $contactController->GetData();
                
                $result = $data;
            } else if($paths[4] === "delete") {
                $urlParams = $_GET['id'];

                $contactController = new ContactController();
                $data = $contactController->DeleteContact($urlParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else if($paths[3] === "information-and-services") {
            include_once __DIR__ . '/controllers/informationAndServicesController.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "insert") {
                $informationAndServicesController = new InformationAndServicesController();
                $data = $informationAndServicesController->InsertInformationAndServices($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "get-option") {
                $informationAndServicesController = new InformationAndServicesController();
                $data = $informationAndServicesController->GetOptionInformationAndServices($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "edit") {
                $informationAndServicesController = new InformationAndServicesController();
                $data = $informationAndServicesController->EditInformationAndServices($jsonParams);
                
                $result = $data;
            } else if($paths[4] === "delete") {
                $urlParams = $_GET['id'];

                $informationAndServicesController = new InformationAndServicesController();
                $data = $informationAndServicesController->DeleteInformationAndServices($urlParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else if($paths[3] === "midtrans") {
            include_once __DIR__ . '/placeOrder.php';
            $jsonParams = json_decode(file_get_contents('php://input'), true);

            if($paths[4] === "pay") {
                $midTrans = new MidTrans();
                $data = $midTrans->midTrans($jsonParams);
                
                $result = $data;
            } else {
                throw new Exception('Invalid Endpoint');
            }
        } else {
            throw new Exception('Invalid Endpoint');
        }

        echo json_encode($result);
    } catch (Exception $error) {
        $responseError = ["status" => "failed", "message" => $error->getMessage()];
        echo json_encode($responseError);
    }
?>
