<?php
    include_once __DIR__ . "/../models/transportationClass.php";

    class TransportationController {
        public function InsertTransportation($params) {
            if (!isset($params['value']) || empty($params['value']) || 
            !isset($params['nama_transportasi_wisata']) || empty($params['nama_transportasi_wisata']) || 
            !isset($params['muatan']) || empty($params['muatan'])) {
                    http_response_code(400);
                    return array(
                        "code" => 400, 
                        "status" => "failed",
                        "message" => "Parameter tidak boleh kosong, kurang atau value tidak boleh kosong"
                    );
            }

            $transportationClass = new TransportationClass();
            $transportationResult = $transportationClass->insertTransportation($params);

            if ($transportationResult == false) {
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
                    "message" => "Data transportasi berhasil ditambahkan",
                );
            }
        }

        public function GetOptionTransportation($params) {
            $transportationClass = new TransportationClass();
            $transportationResult = $transportationClass->getOptionTransportation($params);

            if ($transportationResult == false) {
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
                    "data" => $transportationResult
                );
            }
        }
    }
?>
