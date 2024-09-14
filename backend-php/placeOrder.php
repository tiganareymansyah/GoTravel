<?php
    require_once __DIR__ . '/vendor/autoload.php';
    include_once __DIR__ . "/config/connectDb.php";
    include_once __DIR__ . "/config/utilities.php";

    class MidTrans {
        private $connection;

        public function __construct() {
            $database = new ConnectDatabase();
            $this->connection = $database->getConnection();

            if (!$this->connection) {
                die("Database connection failed.");
            }
        }

        public function midTrans($params) {
            /*Install Midtrans PHP Library (https://github.com/Midtrans/midtrans-php)
            composer require midtrans/midtrans-php
                                        
            Alternatively, if you are not using **Composer**, you can download midtrans-php library 
            (https://github.com/Midtrans/midtrans-php/archive/master.zip), and then require 
            the file manually.   

            require_once dirname(__FILE__) . '/pathofproject/Midtrans.php'; */

            //SAMPLE REQUEST START HERE

            // Set your Merchant Server Key
            \Midtrans\Config::$serverKey = 'SB-Mid-server-7DyvsYAUu7NyrYgCg25tAu0V';
            // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
            \Midtrans\Config::$isProduction = false;
            // Set sanitization on (default)
            \Midtrans\Config::$isSanitized = true;
            // Set 3DS transaction for credit card to true
            \Midtrans\Config::$is3ds = true;

            $nama_transportasi = "";
            
            foreach ($params['data_perjalanan'] as $index => $data) {
                $querySelect = "SELECT * FROM tm_tourist_transportation WHERE id = :id";

                $stmt = $this->connection->prepare($querySelect);
                $stmt->bindValue(":id", $data['id_transportasi']);
                $stmt->execute();

                $cek = $stmt->fetch(PDO::FETCH_ASSOC);

                $nama_transportasi = $cek['nama_transportasi_wisata'];
            }

            $order_id = Utilities::generateGUID();;

            $params = array(
                'transaction_details' => array(
                    'order_id' => rand(),
                    'gross_amount' => $params['data_perjalanan'][0]['total'],
                ),
                'item_details' => array(
                    array(
                        'id' => $params['data_perjalanan'][0]['id_transportasi'],
                        'price' => $params['data_perjalanan'][0]['total'],
                        'quantity' => $params['data_perjalanan'][0]['unit'],
                        'name' => $nama_transportasi
                    )
                ),
                'customer_details' => array(
                    'start_booking' => $params['mulai_booking'],
                    'last_booking' => $params['akhir_booking'],
                    'from_the_clock' => $params['dari_jam'],
                    'to_the_clock' => $params['ke_jam'],
                    'first_name' => $params['nama_lengkap'],
                    'nik' => $params['nik'],
                    'email' => $params['email'],
                    'phone' => $params['nomor_hp'],
                    'address' => $params['alamat'],
                    'payment_code' => $params['kode_pembayaran'],
                    'payment_method' => $params['metode_pembayaran'],
                    'billing_address' => array(
                        'first_name' => 'Tigana Reymansyah',
                        'address' => 'BTN Sitio-tio Hilir AMD Kalangan',
                        'phone' => '082267274100',
                        'country_code' => 'IDN'
                    ),
                    'shipping_address' => array(
                        'first_name' => $params['nama_lengkap'],
                        'address' => $params['alamat'],
                        'phone' => $params['nomor_hp'],
                        'country_code' => "IDN"
                    )
                ),
            );

            $snapToken = \Midtrans\Snap::getSnapToken($params);

            $response = array(
                'code' => 201,
                'status' => 'success',
                'message' => 'generate token berhasil',
                'data' => $snapToken
            );

            return $response;
        }
    }
?>