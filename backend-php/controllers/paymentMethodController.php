<?php
    include_once __DIR__ . "/../models/paymentMethodClass.php";

    class PaymentMethodController {
        public function InsertPaymentMethod($params) {
            if(!isset($params['value']) || empty($params['value']) || 
            !isset($params['nama_payment_method']) || empty($params['nama_payment_method'])) {
                http_response_code(400);
                return array(
                    "code" => 400, 
                    "status" => "failed",
                    "message" => "Parameter tidak boleh kosong, kurang atau value tidak boleh kosong"
                );
            }

            $paymentMethodClass = new PaymentMethodClass();
            $paymentMethodResult = $paymentMethodClass->insertPaymentMethod($params);

            if ($paymentMethodResult == false) {
                http_response_code(500);
                return array(
                    "code" => 500, 
                    "status" => "failed",
                    "message" => "Error"
                );
            } else {
                http_response_code(201);
                return array(
                    "code" => 201, 
                    "status" => "success",
                    "message" => "Data payment method berhasil ditambahkan",
                );
            }
        }

        public function GetOptionPaymentMethod($params) {
            $paymentMethodClass = new PaymentMethodClass();
            $paymentMethodResult = $paymentMethodClass->getOptionPaymentMethod($params);

            if ($paymentMethodResult == false) {
                http_response_code(404);
                return array(
                    "code" => 404, 
                    "status" => "failed",
                    "message" => "Tidak ditemukan"
                );
            } else {
                http_response_code(200);
                return array(
                    "code" => 200, 
                    "status" => "success",
                    "message" => "data ditemukan",
                    "data" => $paymentMethodResult
                );
            }
        }
    }
?>
