<?php
    include_once __DIR__ . "/../models/contactClass.php";

    class ContactController {
        public function AddMessage($params) {
            $contactClass = new ContactClass();
            $contactResult = $contactClass->addMessage($params);

            if($contactResult) {
                http_response_code(201);
                return array(
                    "code" => 201, 
                    "status" => "success",
                    "message" => "Pesan berhasil dikirim"
                );
            } else if ($contactResult == false) {
                http_response_code(500);
                return array(
                    "code" => 500, 
                    "status" => "failed",
                    "message" => "Error"
                );
            }
        }

        public function AddAnswer($params) {
            $contactClass = new ContactClass();
            $contactResult = $contactClass->addAnswer($params);

            if($contactResult) {
                http_response_code(201);
                return array(
                    "code" => 201, 
                    "status" => "success",
                    "message" => "Jawaban berhasil dikirim"
                );
            } else if ($contactResult == false) {
                http_response_code(500);
                return array(
                    "code" => 500, 
                    "status" => "failed",
                    "message" => "Error"
                );
            }
        }

        public function GetData() {
            $contactClass = new ContactClass();
            $contactResult = $contactClass->getData();

            if ($contactResult == false) {
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
                    "data" => $contactResult
                );
            }
        }

        public function DeleteContact($params) {
            $contactClass = new ContactClass();
            $contactResult = $contactClass->deleteContact($params);

            if ($contactResult == false) {
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
                    "message" => "Pesan berhasil dihapus"
                );
            }
        }
    }
?>