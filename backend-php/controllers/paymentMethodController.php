<?php
    include_once __DIR__ . "/../models/paymentMethodClass.php";

    class PaymentMethodController {
        public function InsertPaymentMethod($params) {
            $paymentMethodClass = new PaymentMethodClass();
            $paymentMethodResult = $paymentMethodClass->insertPaymentMethod($params);

            if ($paymentMethodResult == false) throw new Exception("Not Found");

            return $paymentMethodResult;
        }

        public function GetOptionPaymentMethod($params) {
            $paymentMethodClass = new PaymentMethodClass();
            $paymentMethodResult = $paymentMethodClass->getOptionPaymentMethod($params);

            if ($paymentMethodResult == false) throw new Exception("Not Found");

            return $paymentMethodResult;
        }
    }
?>
