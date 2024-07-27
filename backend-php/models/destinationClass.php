<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";

    class DestinationClass {
        private $connection;

        public function __construct() {
            $database = new ConnectDatabase();
            $this->connection = $database->getConnection();

            if (!$this->connection) {
                die("Database connection failed.");
            }
        }

        public function insertDestination($params) {
            try {
                $query = "INSERT INTO tm_tourist_destination (
                    id,
                    value,
                    nama_tujuan_wisata,
                    created_at

                ) VALUES (
                    :id,
                    :value,
                    :nama_tujuan_wisata,
                    NOW()
                )";

                $id = Utilities::generateGUID();;

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":id", $id);
                $stmt->bindValue(":value", $params['value']);
                $stmt->bindValue(":nama_tujuan_wisata", $params['nama_tujuan_wisata']);
                $stmt->execute();

                if ($stmt->rowCount() > 0) return true;
                else return false;
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function getOptionDestination($params) {
            // $query = "SELECT value, nama_tujuan_wisata AS label FROM tm_tourist_destination";
            $query = "SELECT * FROM tm_tourist_destination";

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
            else return false;
        }
    }
?>
