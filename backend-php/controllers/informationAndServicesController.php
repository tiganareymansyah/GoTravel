<?php
    include_once __DIR__ . "/../models/informationAndServicesClass.php";

    class InformationAndServicesController {
        public function InsertInformationAndServices($params) {
            if(!isset($params['id_destinasi']) || empty($params['id_destinasi']) || 
            !isset($params['informasi_dan_layanan']) || empty($params['informasi_dan_layanan'])) {
                http_response_code(400);
                return array(
                    "code" => 400, 
                    "status" => "failed",
                    "message" => "Parameter tidak boleh kosong, kurang atau id_destinasi tidak boleh kosong"
                );
            }

            $informationAndServicesClass = new InformationAndServicesClass();
            $informationAndServicesResult = $informationAndServicesClass->insertInformationAndServices($params);

            if ($informationAndServicesResult == false) {
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
                    "message" => "Informasi dan layanan berhasil ditambahkan",
                );
            }
        }

        public function GetOptionInformationAndServices($params) {
            $informationAndServicesClass = new InformationAndServicesClass();
            $informationAndServicesResult = $informationAndServicesClass->getOptionInformationAndServices($params);

            if ($informationAndServicesResult == false) {
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
                    "data" => $informationAndServicesResult
                );
            }
        }

        public function EditInformationAndServices($params) {
            $informationAndServicesClass = new InformationAndServicesClass();
            $informationAndServicesResult = $informationAndServicesClass->editInformationAndServices($params);

            if ($informationAndServicesResult == false) {
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
                    "message" => "Informasi dan layanan berhasil diedit"
                );
            }
        }

        public function DeleteInformationAndServices($params) {
            $informationAndServicesClass = new InformationAndServicesClass();
            $informationAndServicesResult = $informationAndServicesClass->deleteInformationAndServices($params);

            if ($informationAndServicesResult == false) {
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
                    "message" => "Informasi dan layanan berhasil dihapus"
                );
            }
        }
    }
?>
