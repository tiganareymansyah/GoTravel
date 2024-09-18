<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";

    class InformationAndServicesClass {
        private $connection;

        public function __construct() {
            $database = new ConnectDatabase();
            $this->connection = $database->getConnection();

            if (!$this->connection) {
                die("Database connection failed.");
            }
        }

        public function insertInformationAndServices($params) {
            try {
                $query = "INSERT INTO tm_information_and_services (
                    id,
                    id_destinasi,
                    informasi_dan_layanan,
                    created_at,
                    update_now

                ) VALUES (
                    :id,
                    :id_destinasi,
                    :informasi_dan_layanan,
                    NOW(),
                    NOW()
                )";

                $id = Utilities::generateGUID();;

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":id", $id);
                $stmt->bindValue(":id_destinasi", $params['id_destinasi']);
                $stmt->bindValue(":informasi_dan_layanan", $params['informasi_dan_layanan']);
                $stmt->execute();

                if ($stmt->rowCount() > 0) return true;
                else return false;
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function getOptionInformationAndServices($params) {
            $query = "SELECT tmias.*, tmtd.nama_tujuan_wisata FROM tm_information_and_services tmias
            INNER JOIN tm_tourist_destination tmtd ON tmias.id_destinasi = tmtd.id ORDER BY created_at DESC, update_now DESC";

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return $stmt->fetchAll(PDO::FETCH_ASSOC);
            else return false;
        }

        public function editInformationAndServices($params) {
            $queryUpdate = "UPDATE tm_information_and_services SET 
                id_destinasi = :id_destinasi, 
                informasi_dan_layanan = :informasi_dan_layanan, 
                update_now = NOW() 
                WHERE id = :id
            ";

            $stmt = $this->connection->prepare($queryUpdate);
            $stmt->bindValue(":id_destinasi", $params['id_destinasi']);
            $stmt->bindValue(":informasi_dan_layanan", $params['informasi_dan_layanan']);
            $stmt->bindValue(":id", $params['id']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }

        public function deleteInformationAndServices($params) {
            $query = "DELETE FROM tm_information_and_services WHERE id = :id";

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(":id", $params);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }
    }
?>
