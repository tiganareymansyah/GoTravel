<?php
    include_once __DIR__ . "/../models/logregClass.php";
    
    class LogregController {
        public function RegisterUser($params) {
            if(!isset($params['fullname']) || empty($params['fullname']) || 
            !isset($params['tbt']) || empty($params['tbt']) || 
            !isset($params['gender']) || empty($params['gender']) || 
            !isset($params['email']) || empty($params['email']) || 
            !isset($params['password']) || empty($params['password'])) {
                http_response_code(400);
                return array(
                    "code" => 400, 
                    "status" => "failed",
                    "message" => "Parameter tidak boleh kosong, kurang atau value tidak boleh kosong"
                );
            }

            $logregClass = new LogregClass();
            $logregResult = $logregClass->registerUser($params);

            if($logregResult === "data found") {
                http_response_code(409); // Conflict
                return array(
                    "code" => 409, 
                    "status" => "failed",
                    "message" => "Email anda sudah pernah digunakan sebelumnya"
                );
            } else if (!$logregResult) {
                http_response_code(500); // Internal Server Error
                return array(
                    "code" => 500, 
                    "status" => "failed",
                    "message" => "Error"
                );
            } else {
                http_response_code(201); // Created
                return array(
                    "code" => 201, 
                    "status" => "success",
                    "message" => "Register berhasil"
                );
            }
        }

        public function CekCookie() {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->cekCookie();

            return $logregResult;
        }

        public function LoginUser($params) {
            if(!isset($params['email']) || empty($params['email']) || 
            !isset($params['password']) || empty($params['password'])) {
                http_response_code(400); // Bad Request
                return array(
                    "code" => 400, 
                    "status" => "failed",
                    "message" => "Parameter tidak boleh kosong, kurang atau value tidak boleh kosong"
                );
            }

            $logregClass = new LogregClass();
            $logregResult = $logregClass->loginUser($params);

            if ($logregResult == false) {
                http_response_code(401); // Unauthorized
                return array(
                    "code" => 401, 
                    "status" => "failed",
                    "message" => "Email atau password anda salah"
                );
            } else {
                $logregResult['role'] = "user";
                http_response_code(200); // Success
                return array(
                    "code" => 200, 
                    "status" => "success",
                    "message" => "Login berhasil",
                    "data" => $logregResult
                );
            }
        }

        public function RegisterAdmin($params) {
            if(!isset($params['fullname']) || empty($params['fullname']) || 
            !isset($params['tbt']) || empty($params['tbt']) || 
            !isset($params['gender']) || empty($params['gender']) || 
            !isset($params['email']) || empty($params['email']) || 
            !isset($params['password']) || empty($params['password'])) {
                http_response_code(400);
                return array(
                    "code" => 400, 
                    "status" => "failed",
                    "message" => "Parameter tidak boleh kosong, kurang atau value tidak boleh kosong"
                );
            }

            $logregClass = new LogregClass();
            $logregResult = $logregClass->registerAdmin($params);

            if($logregResult === "data found") {
                http_response_code(409);
                return array(
                    "code" => 409, 
                    "status" => "failed",
                    "message" => "Email anda sudah pernah digunakan sebelumnya"
                );
            } else if (!$logregResult) {
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
                    "message" => "Register berhasil"
                );
            }
        }

        public function LoginAdmin($params) {
            if(!isset($params['email']) || empty($params['email']) || 
            !isset($params['password']) || empty($params['password'])) {
                http_response_code(400);
                return array(
                    "code" => 400, 
                    "status" => "failed",
                    "message" => "Parameter tidak boleh kosong, kurang atau value tidak boleh kosong"
                );
            }

            $logregClass = new LogregClass();
            $logregResult = $logregClass->loginAdmin($params);

            if ($logregResult == false) {
                http_response_code(401);
                return array(
                    "code" => 401, 
                    "status" => "failed",
                    "message" => "Email atau password anda salah"
                );
            } else {
                $logregResult['role'] = "admin";
                http_response_code(200);
                return array(
                    "code" => 200, 
                    "status" => "success",
                    "message" => "Login berhasil",
                    "data" => $logregResult
                );
            }
        }

        public function EditUser($params, $image) {
            $logregClass = new LogregClass();

            $logregResult = $logregClass->editUser($params, $image);
    
            if ($logregResult == false) {
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
                    "message" => "Akun berhasil diedit"
                );
            }
        }

        public function GetDataUserByEmail($params) {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->getDataUserByEmail($params);

            if ($logregResult == false) {
                http_response_code(404);
                return array(
                    "code" => 404, 
                    "status" => "failed",
                    "message" => "Tidak ditemukan"
                );
            } else {
                http_response_code(201);
                return array(
                    "code" => 201, 
                    "status" => "success",
                    "message" => "Data booking by email ditemukan",
                    "data" => $logregResult
                );
            }
        }

        public function DeleteFotoProfil($params) {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->deleteFotoProfil($params);

            if ($logregResult == false) {
                http_response_code(404);
                return array(
                    "code" => 404, 
                    "status" => "failed",
                    "message" => "Gagal hapus foto profil"
                );
            } else {
                http_response_code(200);
                return array(
                    "code" => 200, 
                    "status" => "success",
                    "message" => "Foto profil berhasil dihapus"
                );
            }
        }

        public function ValidationOtp($params) {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->validationOtp($params);

            if ($logregResult == false) {
                http_response_code(401);
                return array(
                    "code" => 401,
                    "status" => "failed",
                    "message" => "Otp yang anda inputkan salah"
                );
            } else {
                http_response_code(200);
                return array(
                    "code" => 200,
                    "status" => "success",
                    "message" => "Otp yang anda inputkan benar"
                );
            }
        } 

        public function GetAkunAdmin($params) {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->getAkunAdmin($params);

            if ($logregResult == false) {
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
                    "data" => $logregResult
                );
            }
        }

        public function EditAdmin($params) {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->editAdmin($params);

            if ($logregResult == false) {
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
                    "message" => "Akun berhasil diedit"
                );
            }
        }

        public function DeleteAdmin($params) {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->deleteAdmin($params);

            if ($logregResult == false) {
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
                    "message" => "Akun berhasil dihapus"
                );
            }
        }
    }
?>
