<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";
    include_once __DIR__ . "/../config/config.php";

    class LogregClass {
        private $connection;

        public function __construct() {
            $database = new ConnectDatabase();
            $this->connection = $database->getConnection();

            if (!$this->connection) {
                die("Database connection failed.");
            }
        }

        public function registerUser($params) {
            try {
                $querySelect = "SELECT * FROM login_user";

                $stmtSelect = $this->connection->prepare($querySelect);
                $stmtSelect->execute();
                $cekEmail = $stmtSelect->fetchAll(PDO::FETCH_ASSOC);

                $emailExists = false;
                $is_success = 0;
                foreach ($cekEmail as $row) {
                    if ($row['email'] === $params['email']) {
                        $emailExists = true;
                        $is_success = $row['is_success'];
                        break;
                    }
                }

                if($emailExists) {
                    if($is_success === 1) {
                        return "data found";
                    } else {
                        $kode_otp = Utilities::OTP();

                        $instanceEmail = new Email();
                        $sendEmail = $instanceEmail->sendEmail($params, $kode_otp);

                        $queryUpdate = "UPDATE login_user SET 
                            id_user = :id_user, 
                            fullname = :fullname, 
                            tbt = :tbt, 
                            gender = :gender, 
                            password = :password, 
                            kode_otp = :kode_otp 
                            WHERE email = :email
                        ";
        
                        $id_user = Utilities::generateGUID();;

                        $stmt = $this->connection->prepare($queryUpdate);
                        $stmt->bindValue(":id_user", $id_user);
                        $stmt->bindValue(":fullname", strtolower($params['fullname']));
                        $stmt->bindValue(":tbt", $params['tbt']);
                        $stmt->bindValue(":gender", strtoupper($params['gender']));
                        $stmt->bindValue(":password", password_hash($params['password'], PASSWORD_DEFAULT));
                        $stmt->bindValue(":kode_otp", $kode_otp);
                        $stmt->bindValue(":email", $params['email']);
                        $stmt->execute();
        
                        if ($stmt->rowCount() > 0) return true;
                        else return false;
                    }
                } else {
                    $kode_otp = Utilities::OTP();

                    $instanceEmail = new Email();
                    $sendEmail = $instanceEmail->sendEmail($params, $kode_otp);

                    $query = "INSERT INTO login_user (
                        id_user,
                        fullname,
                        tbt,
                        gender,
                        email,
                        password,
                        kode_otp,
                        is_success,
                        created_at
    
                    ) VALUES (
                        :id_user,
                        :fullname,
                        :tbt,
                        :gender,
                        :email,
                        :password,
                        :kode_otp,
                        :is_success,
                        NOW()
                    )";
    
                    $id_user = Utilities::generateGUID();;
    
                    $stmt = $this->connection->prepare($query);
                    $stmt->bindValue(":id_user", $id_user);
                    $stmt->bindValue(":fullname", strtolower($params['fullname']));
                    $stmt->bindValue(":tbt", $params['tbt']);
                    $stmt->bindValue(":gender", strtoupper($params['gender']));
                    $stmt->bindValue(":email", $params['email']);
                    $stmt->bindValue(":password", password_hash($params['password'], PASSWORD_DEFAULT));
                    $stmt->bindValue(":kode_otp", $kode_otp);
                    $stmt->bindValue(":is_success", 0);
                    $stmt->execute();
    
                    if ($stmt->rowCount() > 0) return true;
                    else return false;
                }
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function cekCookie() {
            try {
                session_start();

                $header = "";

                if(isset($_COOKIE['userLogin'])) {
                    if(isset($_COOKIE['userLogin']) == 'true') {
                        $header = "/home";
                    } else {
                        $header = "/";
                    }
                }

                return $header;
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function loginUser($params) {
            try {
                $query = "SELECT * FROM login_user WHERE email = :email";

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":email", $params['email']);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if($result) {
                    if(password_verify($params['password'], $result['password'])) {
                        $payload = array(
                            "email" => $result['email'],
                            "loginDate" => date('Y-m-d H:i:s')
                        );
            
                        $token = Utilities::jwtEncode($payload);;
                        $result['token'] = $token;
    
                        $dataUserLogin = array(
                            "id_user" => $result['id_user'],
                            "fullname" => $result['fullname'],
                            "tbt" => $result['tbt'],
                            "gender" => $result['gender'],
                            "email" => $result['email'],
                            "created_at" => $result['created_at'],
                            "token" => $result['token'],
                            "foto_profil" => $result['foto_profil']
                            // "token_expiration" => time() + 60 // 1 menit
                            // "token_expiration" => time() + 24 * 60 * 60 // 1 hari
                        );
    
                        return $dataUserLogin;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function registerAdmin($params) {
            try {
                $querySelect = "SELECT email FROM login_admin";

                $stmtSelect = $this->connection->prepare($querySelect);
                $stmtSelect->execute();
                $cekEmail = $stmtSelect->fetch(PDO::FETCH_ASSOC);

                if($cekEmail && $cekEmail['email'] === $params['email']) {
                    return "data found";
                } else {
                    $query = "INSERT INTO login_admin (
                        id_admin,
                        fullname,
                        tbt,
                        gender,
                        email,
                        password,
                        created_at
    
                    ) VALUES (
                        :id_admin,
                        :fullname,
                        :tbt,
                        :gender,
                        :email,
                        :password,
                        NOW()
                    )";
    
                    $id_admin = Utilities::generateGUID();;
    
                    $stmt = $this->connection->prepare($query);
                    $stmt->bindValue(":id_admin", $id_admin);
                    $stmt->bindValue(":fullname", strtolower($params['fullname']));
                    $stmt->bindValue(":tbt", $params['tbt']);
                    $stmt->bindValue(":gender", strtoupper($params['gender']));
                    $stmt->bindValue(":email", $params['email']);
                    $stmt->bindValue(":password", password_hash($params['password'], PASSWORD_DEFAULT));
                    $stmt->execute();
    
                    if ($stmt->rowCount() > 0) return true;
                    else return false;
                }
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function loginAdmin($params) {
            try {
                $query = "SELECT * FROM login_admin WHERE email = :email";

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":email", $params['email']);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if($result) {
                    if(password_verify($params['password'], $result['password'])) {
                        $payload = array(
                            "email" => $result['email'],
                            "loginDate" => date('Y-m-d H:i:s')
                        );
            
                        $token = Utilities::jwtEncode($payload);;
                        $result['token'] = $token;
    
                        $dataAdminLogin = array(
                            "id_admin" => $result['id_admin'],
                            "fullname" => $result['fullname'],
                            "date_of_birth" => $result['tbt'],
                            "gender" => $result['gender'],
                            "email" => $result['email'],
                            "created_at" => $result['created_at'],
                            "token" => $result['token']
                            // "token_expiration" => time() + 60 // 1 menit
                            // "token_expiration" => time() + 24 * 60 * 60 // 1 hari
                        );
    
                        return $dataAdminLogin;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function editUser($params, $image) {
            $querySelect = "SELECT * FROM login_user WHERE id_user = :id_user";

            $stmtSelect = $this->connection->prepare($querySelect);
            $stmtSelect->bindValue(":id_user", $params['id']);
            $stmtSelect->execute();
            $cekEmail = $stmtSelect->fetch(PDO::FETCH_ASSOC);

            if($params['is_edit'] === 1) {
                $queryUpdate = "UPDATE login_user SET 
                    password = :password 
                    WHERE id_user = :id_user
                ";
    
                $stmt = $this->connection->prepare($queryUpdate);
                $stmt->bindValue(":password", $params['password'] === "" ? $cekEmail['password'] : password_hash($params['password'], PASSWORD_DEFAULT));
                $stmt->bindValue(":id_user", $params['id']);
                $stmt->execute();
            } else {
                $queryUpdate = "UPDATE login_user SET 
                    fullname = :fullname, 
                    tbt = :tbt, 
                    gender = :gender 
                    WHERE id_user = :id_user
                ";
    
                $stmt = $this->connection->prepare($queryUpdate);
                $stmt->bindValue(":fullname", $params['fullname'] === "" ? $cekEmail['fullname'] : strtolower($params['fullname']));
                $stmt->bindValue(":tbt", $params['tbt'] === "" ? $cekEmail['tbt'] : $params['tbt']);
                $stmt->bindValue(":gender", $params['gender'] === "" ? $cekEmail['gender'] : strtoupper($params['gender']));
                $stmt->bindValue(":id_user", $params['id']);
                $stmt->execute();
            }

            if (!empty($image['name'])) {
                $uploadDir = __DIR__ . '/../profilImages/';
                $imageName = uniqid() . '-' . basename($image['name']);
                $uploadFile = $uploadDir . $imageName;

                if (move_uploaded_file($image['tmp_name'], $uploadFile)) {
                    $queryImageUpdate = "UPDATE login_user SET foto_profil = :foto_profil WHERE id_user = :id_user";
                    $stmtImage = $this->connection->prepare($queryImageUpdate);
                    $stmtImage->bindValue(":foto_profil", $imageName);
                    $stmtImage->bindValue(":id_user", $params['id']);
                    $stmtImage->execute();
                }
            }

            if ($stmt->rowCount() > 0 || $stmtImage->rowCount() > 0) return true;
            else return false;
        }

        public function getDataUserByEmail($params) {
            try {
                $query = "SELECT * FROM login_user WHERE email = :email";

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":email", $params);
                $stmt->execute();

                if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
                else return false;
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function deleteFotoProfil($params) {
            $query = "UPDATE login_user SET foto_profil = NULL WHERE id_user = :id_user";

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(":id_user", $params);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }

        public function validationOtp($params) {
            try {
                $querySelect = "SELECT * FROM login_user";

                $stmtSelect = $this->connection->prepare($querySelect);
                $stmtSelect->execute();
                $cekEmail = $stmtSelect->fetchAll(PDO::FETCH_ASSOC);

                $emailTrue = false;
                foreach ($cekEmail as $row) {
                    if ($row['email'] === $params['email'] && 
                    $row['kode_otp'] === $params['kode_otp']) {
                        $emailTrue = true;
                        break;
                    }
                }

                if($emailTrue) {
                    $queryUpdate = "UPDATE login_user SET 
                        is_success = :is_success 
                        WHERE email = :email
                    ";

                    $id_user = Utilities::generateGUID();;

                    $stmt = $this->connection->prepare($queryUpdate);
                    $stmt->bindValue(":is_success", 1);
                    $stmt->bindValue(":email", $params['email']);
                    $stmt->execute();

                    return true;
                } else {
                    return false;
                }
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function getAkunAdmin($params) {
            $query = "SELECT * FROM login_admin";

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
            else return false;
        }

        public function editAdmin($params) {
            $querySelect = "SELECT * FROM login_admin WHERE id_admin = :id_admin";

            $stmtSelect = $this->connection->prepare($querySelect);
            $stmtSelect->bindValue(":id_admin", $params['id']);
            $stmtSelect->execute();
            $cekEmail = $stmtSelect->fetch(PDO::FETCH_ASSOC);

            if($params['is_edit'] === 1) {
                $queryUpdate = "UPDATE login_admin SET 
                    password = :password 
                    WHERE id_admin = :id_admin
                ";
    
                $stmt = $this->connection->prepare($queryUpdate);
                $stmt->bindValue(":password", $params['password'] === "" ? $cekEmail['password'] : password_hash($params['password'], PASSWORD_DEFAULT));
                $stmt->bindValue(":id_admin", $params['id']);
                $stmt->execute();
    
                if ($stmt->rowCount() > 0) return true;
                else return false;
            } else {
                $queryUpdate = "UPDATE login_admin SET 
                    fullname = :fullname, 
                    tbt = :tbt, 
                    gender = :gender, 
                    email = :email 
                    WHERE id_admin = :id_admin
                ";
    
                $stmt = $this->connection->prepare($queryUpdate);
                $stmt->bindValue(":fullname", $params['fullname'] === "" ? $cekEmail['fullname'] : strtolower($params['fullname']));
                $stmt->bindValue(":tbt", $params['tbt'] === "" ? $cekEmail['tbt'] : $params['tbt']);
                $stmt->bindValue(":gender", $params['gender'] === "" ? $cekEmail['gender'] : strtoupper($params['gender']));
                $stmt->bindValue(":email", $params['email'] === "" ? $cekEmail['email'] : $params['email']);
                $stmt->bindValue(":id_admin", $params['id']);
                $stmt->execute();
    
                if ($stmt->rowCount() > 0) return true;
                else return false;
            }

        }

        public function deleteAdmin($params) {
            $query = "DELETE FROM login_admin WHERE id_admin = :id_admin";

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(":id_admin", $params);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }
    }
?>
