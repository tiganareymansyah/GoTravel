<?php
    include_once __DIR__ . "/../config/connectDb.php";
    include_once __DIR__ . "/../config/utilities.php";
    include_once __DIR__ . "/../config/config.php";

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

                if ($stmt->rowCount() > 0) {
                    $total = 0;

                    foreach ($params['data_perjalanan'] as $index => $perjalanan) {
                        $total += $perjalanan['total'];
                    }

                    foreach ($params['data_perjalanan'] as $index => $data) {
                        $getDuration = $data['durasi'] * 86400;
                        $duration = $getDuration;
                        $mulai_booking = date('Y-m-d H:i:s');
                        $akhir_booking = date('Y-m-d H:i:s', strtotime($mulai_booking) + $duration);
                        $id_transportasi = $data['transportasi'];

                        $updateStok = $this->checkStokTransportation($data['transportasi']);

                        if($updateStok) {
                            $query1 = "INSERT INTO payment (
                                id,
                                kode_pembayaran,
                                kode_booking,
                                metode_pembayaran,
                                total_bayar,
                                id_transportasi,
                                mulai_booking,
                                akhir_booking,
                                created_at
            
                            ) VALUES (
                                :id,
                                :kode_pembayaran,
                                $kode_booking,
                                :metode_pembayaran,
                                $total,
                                :id_transportasi,
                                :mulai_booking,
                                :akhir_booking,
                                NOW()
                            )";
        
                            $id_payment = Utilities::generateGUID();
            
                            $stmt1 = $this->connection->prepare($query1);
                            $stmt1->bindValue(":id", $id_payment);
                            $stmt1->bindValue(":kode_pembayaran", $params['kode_pembayaran']);
                            $stmt1->bindValue(":metode_pembayaran", $params['metode_pembayaran']);
                            $stmt1->bindValue(":id_transportasi", $id_transportasi);
                            $stmt1->bindValue(":mulai_booking", $mulai_booking);
                            $stmt1->bindValue(":akhir_booking", $akhir_booking);
                            $stmt1->execute();
    
                            if ($stmt1->rowCount() <= 0) {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }

                    $this->handleSendEmailSuccessBooking($params);
                    return true;
                } else {
                    return false;
                }
            } catch (Exception $e) {
                throw $e;
            }
        }

        public function checkStokTransportation($id) {
            $queryCheckId = "SELECT stok FROM tm_tourist_transportation WHERE id = :id";

            $stmt = $this->connection->prepare($queryCheckId);
            $stmt->bindValue(":id", $id);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $stokNow = $row['stok'] - 1;

            $queryUpdate = "UPDATE tm_tourist_transportation SET 
                stok = :stok
                WHERE id = :id
            ";

            $stmt1 = $this->connection->prepare($queryUpdate);
            $stmt1->bindValue(":stok", $stokNow);
            $stmt1->bindValue(":id", $id);
            $stmt1->execute();

            if($stmt1->rowCount() > 0) return true;
            else return false;
        }

        public function handleSendEmailSuccessBooking($data) {
            $query = "SELECT db.*, 
                p.*,
                tmtt.*
                FROM data_booking db
                LEFT JOIN payment p ON db.kode_booking = p.kode_booking 
                LEFT JOIN tm_tourist_transportation tmtt ON p.id_transportasi = tmtt.id 
                WHERE db.nik = :nik
            ";

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(":nik", $data['nik']);
            $stmt->execute();

            $params = $stmt->fetch(PDO::FETCH_ASSOC);

            $instanceEmail = new Email();
            $sendEmailSuccessBooking = $instanceEmail->sendEmailSuccessBooking($params);
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