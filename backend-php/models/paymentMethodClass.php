<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";

    class PaymentMethodClass {
        private $connection;

        public function __construct() {
            $database = new ConnectDatabase();
            $this->connection = $database->getConnection();

            if (!$this->connection) {
                die("Database connection failed.");
            }
        }

        public function insertPaymentMethod($params) {
            try {
                $query = "INSERT INTO tm_payment_method (
                    id,
                    value,
                    nama_payment_method,
                    created_at

                ) VALUES (
                    :id,
                    :value,
                    :nama_payment_method,
                    NOW()
                )";

                $id = Utilities::generateGUID();;

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":id", $id);
                $stmt->bindValue(":value", $params['value']);
                $stmt->bindValue(":nama_payment_method", $params['nama_payment_method']);
                $stmt->execute();

                if ($stmt->rowCount() > 0) return true;
                else return false;
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function getOptionPaymentMethod($params) {
            $query = "SELECT value, nama_payment_method AS label FROM tm_payment_method";

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
            else return false;
        }
    }
?>
