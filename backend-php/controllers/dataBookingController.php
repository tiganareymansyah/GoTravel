<?php
    include_once __DIR__ . "/../models/dataBookingClass.php";

    class DataBookingController {
        public function AddDataBooking($params) {
            $dataBookingClass = new DataBookingClass();
            $dataBookingResult = $dataBookingClass->addDataBooking($params);

            if($dataBookingResult) {
                http_response_code(201);
                return array(
                    "code" => 201, 
                    "status" => "success",
                    "message" => "Data booking berhasil ditambahkan"
                );
            } else if ($dataBookingResult == false) {
                http_response_code(500);
                return array(
                    "code" => 500, 
                    "status" => "failed",
                    "message" => "Error"
                );
            } else if ($dataBookingResult == "stok") {
                http_response_code(500);
                return array(
                    "code" => 500, 
                    "status" => "failed",
                    "message" => "Transportasi tidak tersedia"
                );
            }
        }

        public function GetDataBookingByEmail($params) {
            $dataBookingClass = new DataBookingClass();
            $dataBookingResult = $dataBookingClass->getDataBookingByEmail($params);

            if ($dataBookingResult == false) {
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
                    "message" => "Data booking by email ditemukan",
                    "data" => $dataBookingResult
                );
            }
        }

        public function GetDataBooking($params) {
            $dataBookingClass = new DataBookingClass();
            $dataBookingResult = $dataBookingClass->getDataBooking($params);

            if ($dataBookingResult == false) {
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
                    "message" => "Data booking ditemukan",
                    "data" => $dataBookingResult
                );
            }
        }

        public function EditPay($params) {
            $dataBookingClass = new DataBookingClass();
            $dataBookingResult = $dataBookingClass->editPay($params);

            if ($dataBookingResult == false) {
                http_response_code(404);
                return array(
                    "code" => 404, 
                    "status" => "failed",
                    "message" => "Gagal pembayaran"
                );
            } else {
                http_response_code(200);
                return array(
                    "code" => 200, 
                    "status" => "success",
                    "message" => "Pembayaran berhasil"
                );
            }
        }

        public function DeleteDataBooking($params) {
            $dataBookingClass = new DataBookingClass();
            $dataBookingResult = $dataBookingClass->deleteDataBooking($params);

            if ($dataBookingResult == false) {
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
                    "message" => "Data booking berhasil dihapus"
                );
            }
        }
    }
?>