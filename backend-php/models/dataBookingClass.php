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

                $total = 0;

                foreach ($params['data_perjalanan'] as $index => $perjalanan) {
                    $total += $perjalanan['total'];
                }

                $dataId = array();

                foreach ($params['data_perjalanan'] as $index => $data) {
                    $cekQueryStok = "SELECT * FROM tm_tourist_transportation WHERE id = :id";

                    $stmt = $this->connection->prepare($cekQueryStok);
                    $stmt->bindValue(":id", $data['id_transportasi']);
                    $stmt->execute();

                    $cek = $stmt->fetch(PDO::FETCH_ASSOC);

                    if($cek['stok'] < 1) {
                        return "stok";
                    } else {
                        $dataId[] = $data['id_transportasi'];
                    }
                }

                $updateStok = $this->checkStokTransportation($dataId);

                if($updateStok) {
                    $query = "INSERT INTO data_booking (
                        kode_booking,
                        data_perjalanan,
                        nama_lengkap,
                        nik,
                        email,
                        nomor_hp,
                        alamat,
                        kode_pembayaran,
                        metode_pembayaran,
                        total_bayar,
                        mulai_booking,
                        akhir_booking,
                        dari_jam,
                        ke_jam,
                        is_bayar,
                        created_at
    
                    ) VALUES (
                        $kode_booking,
                        :data_perjalanan,
                        :nama_lengkap,
                        :nik,
                        :email,
                        :nomor_hp,
                        :alamat,
                        :kode_pembayaran,
                        :metode_pembayaran,
                        $total,
                        :mulai_booking,
                        :akhir_booking,
                        :dari_jam,
                        :ke_jam,
                        :is_bayar,
                        NOW()
                    )";
    
                    $stmt = $this->connection->prepare($query);
                    $stmt->bindValue(":data_perjalanan", json_encode($params['data_perjalanan']));
                    $stmt->bindValue(":nama_lengkap", $params['nama_lengkap']);
                    $stmt->bindValue(":nik", $params['nik']);
                    $stmt->bindValue(":email", $params['email']);
                    $stmt->bindValue(":nomor_hp", $params['nomor_hp']);
                    $stmt->bindValue(":alamat", $params['alamat']);
                    $stmt->bindValue(":kode_pembayaran", $params['kode_pembayaran']);
                    $stmt->bindValue(":metode_pembayaran", $params['metode_pembayaran']);
                    $stmt->bindValue(":mulai_booking", $params['mulai_booking']);
                    $stmt->bindValue(":akhir_booking", $params['akhir_booking']);
                    $stmt->bindValue(":dari_jam", $params['dari_jam']);
                    $stmt->bindValue(":ke_jam", $params['ke_jam']);
                    $stmt->bindValue(":is_bayar", $params['metode_pembayaran'] === "qris" ? 1 : 0);
                    $stmt->execute();
    
                    if($stmt->rowCount() > 0) {
                        $this->handleSendEmailSuccessBooking($params);
                        return true;
                    } else {
                        return false;
                    }
                }

            } catch (Exception $e) {
                throw $e;
            }
        }

        public function checkStokTransportation($dataId) {
            foreach ($dataId as $id) {
                $queryCheckId = "SELECT stok FROM tm_tourist_transportation WHERE id = :id";

                $stmt = $this->connection->prepare($queryCheckId);
                $stmt->bindValue(":id", $id);
                $stmt->execute();
            
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($row) {
                    $stokNow = $row['stok'] - 1;

                    $queryUpdate = "UPDATE tm_tourist_transportation SET 
                        stok = :stok
                        WHERE id = :id
                    ";
            
                    $stmt1 = $this->connection->prepare($queryUpdate);
                    $stmt1->bindValue(":stok", $stokNow);
                    $stmt1->bindValue(":id", $id);
                    $stmt1->execute();
                } else {
                    return false;
                }
            }

            return true;
        }

        public function handleSendEmailSuccessBooking($data) {
            $query = "SELECT * FROM data_booking WHERE nik = :nik ORDER BY mulai_booking DESC, created_at DESC";

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(":nik", $data['nik']);
            $stmt->execute();

            $params = $stmt->fetch(PDO::FETCH_ASSOC);

            $instanceEmail = new Email();
            $sendEmailSuccessBooking = $instanceEmail->sendEmailSuccessBooking($params);
        }

        public function getDataBookingByEmail($params) {
            try {
                $query = "SELECT * FROM data_booking WHERE email = :email";

                $stmt = $this->connection->prepare($query);
                $stmt->bindValue(":email", $params);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
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

        public function getDataBooking($params) {
            try {
                $query = "SELECT * FROM data_booking ORDER BY is_bayar ASC, mulai_booking DESC, created_at DESC";

                $stmt = $this->connection->prepare($query);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
                    foreach ($results as &$result) {
                        if (isset($result['data_perjalanan'])) {
                            $result['data_perjalanan'] = json_decode($result['data_perjalanan'], true);

                            $querySelect = "SELECT nama_transportasi_wisata FROM tm_tourist_transportation WHERE id = :id";
        
                            $stmt1 = $this->connection->prepare($querySelect);
                            $stmt1->bindValue(":id", $result['data_perjalanan'][0]['id_transportasi']);
                            $stmt1->execute();
                            $transportasiResult = $stmt1->fetch(PDO::FETCH_ASSOC);

                            foreach ($result['data_perjalanan'] as &$perjalanan) {
                                $perjalanan['nama_transportasi'] = $transportasiResult['nama_transportasi_wisata'];
                            }
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

        public function editPay($params) {
            $queryUpdate = "UPDATE data_booking SET is_bayar = :is_bayar WHERE kode_booking = :kode_booking";

            $stmt = $this->connection->prepare($queryUpdate);
            $stmt->bindValue(":is_bayar", 1);
            $stmt->bindValue(":kode_booking", $params['kode_booking']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }

        public function deleteDataBooking($params) {
            foreach ($params['data_perjalanan'] as $index => $data) {
                $querySelect = "SELECT * FROM tm_tourist_transportation WHERE id = :id";

                $stmt = $this->connection->prepare($querySelect);
                $stmt->bindValue(":id", $data['id_transportasi']);
                $stmt->execute();
                $currentStok = $stmt->fetch(PDO::FETCH_ASSOC);

                $newStock = $currentStok['stok'] + $data['unit'];

                $queryUpdate = "UPDATE tm_tourist_transportation SET stok = :stok WHERE id = :id";

                $stmt1 = $this->connection->prepare($queryUpdate);
                $stmt1->bindValue(":stok", $newStock);
                $stmt1->bindValue(":id", $data['id_transportasi']);
                $stmt1->execute();
            };

            $queryDelete = "DELETE FROM data_booking WHERE kode_booking = :kode_booking";

            $stmt = $this->connection->prepare($queryDelete);
            $stmt->bindValue(":kode_booking", $params['kode_booking']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) return true;
            else return false;
        }
    }
?>