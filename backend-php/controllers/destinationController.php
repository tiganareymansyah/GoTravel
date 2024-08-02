<?php
    include_once __DIR__ . "/../models/destinationClass.php";

    class DestinationController {
        public function InsertDestination($params) {
            if(!isset($params['value']) || empty($params['value']) || 
            !isset($params['nama_tujuan_wisata']) || empty($params['nama_tujuan_wisata'])) {
                http_response_code(400);
                return array(
                    "code" => 400, 
                    "status" => "failed",
                    "message" => "Parameter tidak boleh kosong, kurang atau value tidak boleh kosong"
                );
            }

            $destinationClass = new DestinationClass();
            $destinationResult = $destinationClass->insertDestination($params);

            if ($destinationResult == false) {
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
                    "message" => "Data destinasi berhasil ditambahkan",
                );
            }
        }

        public function GetOptionDestination($params) {
            $destinationClass = new DestinationClass();
            $destinationResult = $destinationClass->getOptionDestination($params);

            if ($destinationResult == false) {
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
                    "data" => $destinationResult
                );
            }
        }

        public function EditDestination($params) {
            $destinationClass = new DestinationClass();
            $destinationResult = $destinationClass->editDestination($params);

            if ($destinationResult == false) {
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
                    "message" => "Data destinasi berhasil diedit"
                );
            }
        }

        public function DeleteDestination($params) {
            $destinationClass = new DestinationClass();
            $destinationResult = $destinationClass->deleteDestination($params);

            if ($destinationResult == false) {
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
                    "message" => "Data destinasi berhasil dihapus"
                );
            }
        }
    }
?>
