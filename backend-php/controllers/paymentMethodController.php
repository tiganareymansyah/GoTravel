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
                    "message" => "Data metode pembayaran berhasil ditambahkan",
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

        public function GetKodePayment() {
            $paymentMethodClass = new PaymentMethodClass();
            $paymentMethodResult = $paymentMethodClass->getKodePayment();

            if ($paymentMethodResult == false) {
                http_response_code(404);
                return array(
                    "code" => 404, 
                    "status" => "failed",
                    "message" => "Pembuatan kode pembayaran gagal"
                );
            } else {
                http_response_code(200);
                return array(
                    "code" => 200, 
                    "status" => "success",
                    "message" => "Pembuatan kode pembayaran berhasil",
                    "data" => $paymentMethodResult
                );
            }
        }

        public function EditPaymentMethod($params) {
            $paymentMethodClass = new PaymentMethodClass();
            $paymentMethodResult = $paymentMethodClass->editPaymentMethod($params);

            if ($paymentMethodResult == false) {
                http_response_code(404);
                return array(
                    "code" => 404, 
                    "status" => "failed",
                    "message" => "Gagal ubah data"
                );
            } else {
                http_response_code(200);
                return array(
                    "code" => 200, 
                    "status" => "success",
                    "message" => "Data metode pembayaran berhasil diedit"
                );
            }
        }

        public function DeletePaymentMethod($params) {
            $paymentMethodClass = new PaymentMethodClass();
            $paymentMethodResult = $paymentMethodClass->deletePaymentMethod($params);

            if ($paymentMethodResult == false) {
                http_response_code(404);
                return array(
                    "code" => 404, 
                    "status" => "failed",
                    "message" => "Gagal hapus data"
                );
            } else {
                http_response_code(200);
                return array(
                    "code" => 200, 
                    "status" => "success",
                    "message" => "Data metode pembayaran berhasil dihapus"
                );
            }
        }
    }
?>
