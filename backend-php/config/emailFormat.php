<?php
    class emailFormat {
        public function verifikasiOtp($kodeOtp)
        {
            $htmlString = '<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title> Verifikasi OTP Pelayanan Paspor </title>
                    <style>
                    .bold-black {
                        font-weight: bold;
                        color: black;
                    }
                    .color-red {
                        color: red;
                    }
                    body {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .italic{
                        font-style: italic
                    }
                    .kodeOtp {
                        font-size: 24px;
                        text-align: center;
                        padding: 10px;
                        color:black
                    }
                    </style>
                </head>
                <body>
                    <p style="text-align:center"><strong><span style="font-size:24px">Lengkapi Pendaftaran Anda</span></strong></p>

                    <h3 style="text-align:center"><strong>Selamat Datang di Website GoTravel</strong></h3>
                    
                    <p>Bapak/Ibu yang terhomat, Terima kasih telah mendaftarkan email anda pada&nbsp;Website GoTravel.<br />
                    Berikut ini adalah kode OTP untuk pendaftaran akun</p>
                    
                    <p style="text-align:center"><strong>' . $kodeOtp . '</strong><br />
                    &nbsp;</p>

                    <p>Kode Verifikasi berlaku selama 3 menit. Harap tidak menyebarkan kode kepada siapapun demi menjaga keamanan akun.</p><br /> 
                </body>
                </html>';

            return $htmlString;
        }
    }
?>