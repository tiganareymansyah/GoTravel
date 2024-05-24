<?php
    include_once __DIR__ . "/../models/destinationClass.php";

    class DestinationController {
        public function InsertDestination($params) {
            $destinationClass = new DestinationClass();
            $destinationResult = $destinationClass->insertDestination($params);

            if ($destinationResult == false) throw new Exception("Not Found");

            return $destinationResult;
        }

        public function GetOptionDestination($params) {
            $destinationClass = new DestinationClass();
            $destinationResult = $destinationClass->getOptionDestination($params);

            if ($destinationResult == false) throw new Exception("Not Found");

            return $destinationResult;
        }
    }
?>
