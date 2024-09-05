<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";
    include_once __DIR__ . "/../config/config.php";

    class ContactClass {
        private $connection;

        public function __construct() {
            $database = new ConnectDatabase();
            $this->connection = $database->getConnection();

            if (!$this->connection) {
                die("Database connection failed.");
            }
        }

        public function addMessage($params) {
            $queryInsert = "INSERT INTO contact_us (
                id,
                message,
                id_user,
                created_at

            ) VALUES (
                :id,
                :message,
                :id_user,
                NOW()
            )";

            $id = Utilities::generateGUID();;

            $stmt = $this->connection->prepare($queryInsert);
            $stmt->bindValue(":id", $id);
            $stmt->bindValue(":message", $params['message']);
            $stmt->bindValue(":id_user", $params['id_user']);
            $stmt->execute();

            if($stmt->rowCount() > 0) {
                $this->handleSendEmailSuccessContact($params, "message");
                return true;
            } else {
                return false;
            }
        }

        public function addAnswer($params) {
            $queryUpdate = "UPDATE contact_us SET answer = :answer, update_now = NOW() WHERE id_user = :id_user";

            $stmt = $this->connection->prepare($queryUpdate);
            $stmt->bindValue(":answer", $params['answer']);
            $stmt->bindValue(":id_user", $params['id_user']);
            $stmt->execute();

            if($stmt->rowCount() > 0) {
                $this->handleSendEmailSuccessContact($params, "answer");
                return true;
            } else {
                return false;
            }
        }

        public function handleSendEmailSuccessContact($data, $cek) {
            if($cek == "message") {
                $querySelect = "SELECT cu.*, lu.* FROM contact_us cu 
                    INNER JOIN login_user lu ON cu.id_user = lu.id_user WHERE cu.id_user = :id_user";
    
                $stmt = $this->connection->prepare($querySelect);
                $stmt->bindValue(":id_user", $data['id_user']);
                $stmt->execute();
    
                $params = $stmt->fetch(PDO::FETCH_ASSOC);
    
                $instanceEmail = new Email();
                $sendEmailSuccessBooking = $instanceEmail->sendMessage($params);
            } else {
                $querySelect = "SELECT cu.*, lu.* FROM contact_us cu 
                    INNER JOIN login_user lu ON cu.id_user = lu.id_user WHERE cu.id_user = :id_user";
    
                $stmt = $this->connection->prepare($querySelect);
                $stmt->bindValue(":id_user", $data['id_user']);
                $stmt->execute();
    
                $params = $stmt->fetch(PDO::FETCH_ASSOC);
    
                $instanceEmail = new Email();
                $sendEmailSuccessBooking = $instanceEmail->sendAnswer($params);
            }
        }

        public function getData() {
            $query = "SELECT cu.*, lu.fullname, tbt, gender, email, 
                token, kode_otp, is_success, foto_profil FROM contact_us cu 
                INNER JOIN login_user lu ON cu.id_user = lu.id_user 
                ORDER BY cu.answer IS NULL DESC, cu.created_at DESC";

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
            else return false;
        }

        public function deleteContact($params) {
            $query = "DELETE FROM contact_us WHERE id = :id";

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(":id", $params);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }
    }
?>