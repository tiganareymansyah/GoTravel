<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'sendEmail/src/Exception.php';
require 'sendEmail/src/PHPMailer.php';
require 'sendEmail/src/SMTP.php';

if (isset($_POST['send'])) {
    $mail = new PHPMailer(true);

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
        $mail->addAddress($_POST['email']); // Recipient's email

        // Content
        $mail->isHTML(true);
        $mail->Subject = $_POST['subject'];
        $mail->Body    = $_POST['pesan'];

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>