<?php
    // namespace MyApp\Config;
    
    // include_once __DIR__ . "/../vendor/autoload.php";

    include_once __DIR__ . "/JWT.php";

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class Utilities {
        // private static $secretKey = 'trs';

        public static function generateGUID() {
            if (function_exists('com_create_guid') === true) {
                return trim(com_create_guid(), '{}');
            }
    
            return sprintf(
                '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                mt_rand(0, 0xffff),
                mt_rand(0, 0xffff),
                mt_rand(0, 0xffff),
                mt_rand(0, 0x0fff) | 0x4000,
                mt_rand(0, 0x3fff) | 0x8000,
                mt_rand(0, 0xffff),
                mt_rand(0, 0xffff),
                mt_rand(0, 0xffff)
            );
        }

        public static function jwtEncode($payload) {
            $key = 'trs';
            $token = JWT::encode($payload, $key, 'HS256');

            return $token;
        }
    }
?>
