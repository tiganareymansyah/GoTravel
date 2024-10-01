<?php
    // // Koneksi ke database Postgresql
    class ConnectDatabase {
        public function getConnection() {
            $host = 'localhost';
            $database = 'postgres';
            $username = 'postgres';
            $password = 'sakalite2502';
    
            try {
                $conn = new PDO("pgsql:host=$host;dbname=$database;user=$username;password=$password");
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
                return $conn;
            } catch (PDOException $e) {
                throw new Exception("Koneksi gagal: " . $e->getMessage());
            }
        }
    }



    // // Koneksi ke database Mysql
    // class ConnectDatabase {
    //     public function getConnection() {
    //         $host = "localhost";
    //         $database = "mysql_gotravel";
    //         $username = "root";
    //         $password = "sakalite2502";

    //         try {
    //             $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    //             $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //             return $conn;
    //         } catch (PDOException $e) {
    //             throw new Exception("Koneksi gagal: " . $e->getMessage());
    //         }
    //     }
    // }
?>
