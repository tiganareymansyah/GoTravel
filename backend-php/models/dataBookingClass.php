<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";

    class DataBookingClass {
        private $connection;

        public function __construct() {
            $database = new ConnectDatabase();
            $this->connection = $database->getConnection();

            if (!$this->connection) {
                die("Database connection failed.");
            }
        }

        public function addDataBooking($params) {
            try {
                date_default_timezone_set('Asia/Jakarta');
                $queryGetLastBookingCode = "SELECT kode_booking FROM data_booking ORDER BY kode_booking DESC LIMIT 1";

                $stmt = $this->connection->prepare($queryGetLastBookingCode);
                $stmt->execute();

                $lastBookingCode = "";

                if($stmt->rowCount() > 0) {
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);
                    $lastBookingCode = $row['kode_booking'];
                }

                $kode_booking = Utilities::generateBookingCode($lastBookingCode);

                $query = "INSERT INTO data_booking (
                    kode_booking,
                    data_perjalanan,
                    nama_lengkap,
                    nik,
                    email,
                    nomor_hp,
                    alamat,
                    created_at

                ) VALUES (
                    $kode_booking,
                    :data_perjalanan,
                    :nama_lengkap,
                    :nik,
                    :email,
                    :nomor_hp,
                    :alamat,
                    NOW()
                )";

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":data_perjalanan", json_encode($params['data_perjalanan']));
                $stmt->bindValue(":nama_lengkap", $params['nama_lengkap']);
                $stmt->bindValue(":nik", $params['nik']);
                $stmt->bindValue(":email", $params['email']);
                $stmt->bindValue(":nomor_hp", $params['nomor_hp']);
                $stmt->bindValue(":alamat", $params['alamat']);
                $stmt->execute();

                if ($stmt->rowCount() > 0) return true;
                else return false;
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function getDataBooking($params) {
            try {
                $query = "SELECT * FROM data_booking";

                $stmt = $this->connection->prepare($query);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
                    // Parsing dinamis untuk properti data_perjalanan
                    foreach ($results as &$result) {
                        if (isset($result['data_perjalanan'])) {
                            $result['data_perjalanan'] = json_decode($result['data_perjalanan'], true);
                        }
                    }
        
                    return $results;
                } else {
                    return false;
                }
            } catch (Exception $e) {
                throw $e;
            }
        }
    }
?>