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

        public function successBooking($params) {
            $formattedNumber = number_format($params['total_bayar'], 0, ',', '.');
            $formatMoney = 'Rp. ' . $formattedNumber . ',-';

            $htmlString = '
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>Booking Confirmation</title>
                    </head>
                    <body style="font-family: sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <div style="text-align: center;">
                                <img src="https://raw.githubusercontent.com/tiganareymansyah/GoTravel/main/frontend-react/src/media/logo_gotravel1.png" width="96px">
                                <div style="text-align: center; font-style: italic;">
                                    <strong>
                                        <span style="font-size: 24px">GoTravel</span>
                                    </strong>
                                </div>
                            </div>
                            <h3 style="text-align: center;"><strong>Selamat Pesanan Anda Telah Berhasil</strong></h3>
                            <div style="margin: 20px 0;">
                                <p style="text-transform: capitalize;">Halo, ' . htmlspecialchars($params['nama_lengkap']) . '</p>
                                <p style="text-indent: 32px; text-align: justify;">
                                    Terima kasih atas kepercayaan anda yang telah melakukan pemesanan pada 
                                    aplikasi <span style="font-style: italic; font-weight: bold;">GoTravel</span>. 
                                    Selamat berlibur dengan keluarga, semoga tetap dalam keadaan sehat baik sewaktu pergi 
                                    ataupun pulang berlibur nanti.
                                </p><br />
                                <span style="font-weight: bold;">Berikut ini adalah detail transaksi yang telah anda lakukan :</span>
                                <p>Kode Booking : ' . htmlspecialchars($params['kode_booking']) . '</p>
                                <p>Kode Pembayaran : ' . htmlspecialchars($params['kode_pembayaran']) . '</p>
                                <p style="text-transform: capitalize;">Nama Lengkap : ' . htmlspecialchars($params['nama_lengkap']) . '</p>
                                <p>Alamat : ' . htmlspecialchars($params['alamat']) . '</p>
                                <p>Email : ' . htmlspecialchars($params['email']) . '</p>
                                <p>Tanggal Pembayaran : ' . htmlspecialchars($params['mulai_booking']) . '</p>
                                <p>Biaya : ' . htmlspecialchars($formatMoney) . '</p>
                                <div style="text-align: right; margin-top: 64px;">
                                    <p>Salam Hangat,</p>
                                    <p style="font-style: italic;">GoTravel</p>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
            ';

            return $htmlString;
        }
    }
?>