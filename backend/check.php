<?php
    include("./jwt.php");

    if(!isset($_POST['jwt'])) {
        header("HTTP/1.0 401 Unauthorized");
    }

    $jwt = substr($_POST['jwt'], 0, strlen($_POST['jwt'])-2);
    $key = $jwt_secret;
    try {
        $seperatedArray = explode('.', $jwt);
        $header = $seperatedArray[0];
        $parameter = $seperatedArray[1];
        $signature = $seperatedArray[2];

        if(hash_hmac('sha256', $header.".".$parameter, $jwt_secret) === $signature) {
            echo $jwt;
        } else {    
            header("HTTP/1.0 401 Unauthorized");
        }
    } catch (\Exception $e) {
        header("HTTP/1.0 401 Unauthorized");
    }
?>