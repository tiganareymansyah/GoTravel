<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";

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
                $querySelect = "SELECT email FROM login_user";

                $stmtSelect = $this->connection->prepare($querySelect);
                $stmtSelect->execute();
                $cekEmail = $stmtSelect->fetch(PDO::FETCH_ASSOC);

                if($cekEmail['email'] === $params['email']) {
                    return "data found";
                } else {
                    $query = "INSERT INTO login_user (
                        id_user,
                        fullname,
                        tbt,
                        gender,
                        email,
                        password,
                        created_at
    
                    ) VALUES (
                        :id_user,
                        :fullname,
                        :tbt,
                        :gender,
                        :email,
                        :password,
                        NOW()
                    )";
    
                    $id_user = Utilities::generateGUID();;
    
                    $stmt = $this->connection->prepare($query);
                    $stmt->bindValue(":id_user", $id_user);
                    $stmt->bindValue(":fullname", $params['fullname']);
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
                            "date_of_birth" => $result['tbt'],
                            "gender" => $result['gender'],
                            "email" => $result['email'],
                            "created_at" => $result['created_at'],
                            "token" => $result['token']
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

                if($cekEmail['email'] === $params['email']) {
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
                    $stmt->bindValue(":fullname", $params['fullname']);
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
    }
?>
