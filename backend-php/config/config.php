<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    include_once __DIR__ . '/../sendEmail/src/Exception.php';
    include_once __DIR__ . '/../sendEmail/src/PHPMailer.php';
    include_once __DIR__ . '/../sendEmail/src/SMTP.php';
    include_once __DIR__ . '/emailFormat.php';

    class Email {
        public function sendEmail($params, $kode_otp) {
            $mail = new PHPMailer(true);
            $verifikasi_otp = new emailFormat();

            try {
                //Server settings
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'tiganareymansyah2502@gmail.com'; // Your email address
                $mail->Password   = 'qzqlptsgambudpfs'; // Your app password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port       = 465;

                //Recipients
                $mail->setFrom('tiganareymansyah2502@gmail.com', 'GoTravel'); // Your email and name
                $mail->addAddress($params['email']); // Recipient's email

                // Content
                $mail->isHTML(true);
                $mail->Subject = "OTP Email";
                $mail->Body    = $verifikasi_otp->verifikasiOtp($kode_otp);

                $mail->send();
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        }

        public function sendEmailSuccessBooking($params) {
            $mail = new PHPMailer(true);
            $content = new emailFormat();

            try {
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'tiganareymansyah2502@gmail.com';
                $mail->Password   = 'qzqlptsgambudpfs';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port       = 465;

                $mail->setFrom('tiganareymansyah2502@gmail.com', 'GoTravel');
                $mail->addAddress($params['email']);

                $mail->isHTML(true);
                $mail->Subject = "Booking Berhasil";
                $mail->Body    = $content->successBooking($params);

                $mail->send();
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        }
    }
?>