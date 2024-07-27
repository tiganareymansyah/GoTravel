<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";

    class TransportationClass {
        private $connection;

        public function __construct() {
            $database = new ConnectDatabase();
            $this->connection = $database->getConnection();

            if (!$this->connection) {
                die("Database connection failed.");
            }
        }

        public function insertTransportation($params) {
            try {
                $query = "INSERT INTO tm_tourist_transportation (
                    id,
                    value,
                    nama_transportasi_wisata,
                    muatan,
                    stok,
                    harga,
                    created_at

                ) VALUES (
                    :id,
                    :value,
                    :nama_transportasi_wisata,
                    :muatan,
                    :stok,
                    :harga,
                    NOW()
                )";

                $id = Utilities::generateGUID();;

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":id", $id);
                $stmt->bindValue(":value", $params['value']);
                $stmt->bindValue(":nama_transportasi_wisata", $params['nama_transportasi_wisata']);
                $stmt->bindValue(":muatan", $params['muatan']);
                $stmt->bindValue(":stok", $params['stok']);
                $stmt->bindValue(":harga", $params['harga']);
                $stmt->execute();

                if ($stmt->rowCount() > 0) return true;
                else return false;
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function getOptionTransportation($params) {
            $query = "SELECT * FROM tm_tourist_transportation ORDER BY harga ASC";

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
            else return false;
        }
    }
?>
