<?php
    include_once __DIR__ . "/../models/logregClass.php";
    
    class LogregController {
        public function RegisterUser($params) {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->registerUser($params);

            return $logregResult;
        }

        public function CekCookie() {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->cekCookie();

            return $logregResult;
        }

        public function LoginUser($params) {
            if ($params['email'] == '' || $params['password'] == '') {
                return throw new Exception('email atau password tidak boleh kosong');
            }

            $logregClass = new LogregClass();
            $logregResult = $logregClass->loginUser($params);

            if ($logregResult == false) {
                return throw new Exception('email atau password anda salah');
            }

            return $logregResult;
        }

        public function RegisterAdmin($params) {
            $logregClass = new LogregClass();
            $logregResult = $logregClass->registerAdmin($params);

            return $logregResult;
        }

        public function LoginAdmin($params) {
            if ($params['email'] == '' || $params['password'] == '') {
                return throw new Exception('email atau password tidak boleh kosong');
            }

            $logregClass = new LogregClass();
            $logregResult = $logregClass->loginAdmin($params);

            if ($logregResult == false) {
                return throw new Exception('email atau password anda salah');
            }

            return $logregResult;
        }
    }
?>