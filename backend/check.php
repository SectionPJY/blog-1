<?php
    require_once 'third_party/vendor/autoload.php';
    use Firebase\JWT\JWT;
    include "./jwt.php";
    include "./StdClassToArray.php";

    if(!isset($_POST['jwt'])) {
        header("HTTP/1.0 401 Unauthorized");
    }

    $jwt = $_POST['jwt'];
    $key = JWT_SECRET;
    try {
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        $decoded_array = objectToArray($decoded);
        
        if($decoded_array['exp'] > time()) {
            $jwt  = makeJWT($decoded_array['data']);
        }
        echo $jwt;
    } catch (\Exception $e) {
        header("HTTP/1.0 401 Unauthorized");
    }
?>