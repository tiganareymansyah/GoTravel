<?php
    include_once __DIR__ . "/../models/dataBookingClass.php";

    class DataBookingController {
        public function AddDataBooking($params) {
            $dataBookingClass = new DataBookingClass();
            $dataBookingResult = $dataBookingClass->addDataBooking($params);

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
                    "message" => "Data booking berhasil ditambahkan"
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
    }
?>