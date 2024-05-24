<?php
    include_once __DIR__ . "/../models/transportationClass.php";

    class TransportationController {
        public function InsertTransportation($params) {
            $transportationClass = new TransportationClass();
            $transportationResult = $transportationClass->insertTransportation($params);

            if ($transportationResult == false) throw new Exception("Not Found");

            return $transportationResult;
        }

        public function GetOptionTransportation($params) {
            $transportationClass = new TransportationClass();
            $transportationResult = $transportationClass->getOptionTransportation($params);

            if ($transportationResult == false) throw new Exception("Not Found");

            return $transportationResult;
        }
    }
?>
