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
            $query = "SELECT * FROM tm_payment_method";

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
            else return false;
        }

        public function getKodePayment() {
            $kode_pembayaran = Utilities::generatePaymentCode();

            return $kode_pembayaran ?? false;
        }

        public function editPaymentMethod($params) {
            $queryUpdate = "UPDATE tm_payment_method SET 
                value = :value, 
                nama_payment_method = :nama_payment_method 
                WHERE id = :id
            ";

            $stmt = $this->connection->prepare($queryUpdate);
            $stmt->bindValue(":value", $params['value']);
            $stmt->bindValue(":nama_payment_method", $params['nama_payment_method']);
            $stmt->bindValue(":id", $params['id']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }

        public function deletePaymentMethod($params) {
            $query = "DELETE FROM tm_payment_method WHERE id = :id";

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(":id", $params);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }
    }
?>
