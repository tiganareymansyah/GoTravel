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

        public static function OTP()
        {
            if (function_exists('com_create_otp') === true) {
                return trim(com_create_otp(), '{}');
            }

            return sprintf('%06d', mt_rand(0, 999999));
        }

        public static function generateBookingCode($lastCode) {
            // $datePart = substr($lastBookingCode, 0, 6);
            // $counterPart = substr($lastBookingCode, 6);
        
            // $currentDate = date('ymd');
            
            // if ($datePart !== $currentDate) {
            //     $newCounterPart = str_pad('0', 10, '0', STR_PAD_LEFT);
            // } else {
            //     $newCounterPart = str_pad((int)$counterPart + 1, 10, '0', STR_PAD_LEFT);
            // }
        
            // $newBookingCode = $currentDate . $newCounterPart;
        
            // return $newBookingCode;

            // Extract date and counter parts
            $datePart = substr($lastCode, 0, 6);
            $counterPart = substr($lastCode, 6);

            // Get current date in the same format
            $currentDate = date('ymd');

            // Check if the date part is different from the current date
            if ($datePart !== $currentDate) {
                // If date is different, reset counter to 0000000000
                $newCounterPart = str_pad('0', 10, '0', STR_PAD_LEFT);
            } else {
                // If date is the same, increment the counter
                $newCounterPart = str_pad((int)$counterPart + 1, 10, '0', STR_PAD_LEFT);
            }

            // Combine the date part and the new counter part
            $newCode = $currentDate . $newCounterPart;

            return $newCode;

        }
    }
?>
