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
                    created_at

                ) VALUES (
                    :id,
                    :value,
                    :nama_transportasi_wisata,
                    :muatan,
                    NOW()
                )";

                $id = Utilities::generateGUID();;

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":id", $id);
                $stmt->bindValue(":value", $params['value']);
                $stmt->bindValue(":nama_transportasi_wisata", $params['nama_transportasi_wisata']);
                $stmt->bindValue(":muatan", $params['muatan']);
                $stmt->execute();

                if ($stmt->rowCount() > 0) return true;
                else return false;
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function getOptionTransportation($params) {
            $query = "SELECT value, nama_transportasi_wisata AS label, muatan, stok FROM tm_tourist_transportation";

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
            else return false;
        }
    }
?>
