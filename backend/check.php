<?php
    include("./jwt.php");

    if(!isset($_POST['jwt'])) {
        header("HTTP/1.0 401 Unauthorized");
        echo 'no jwt';
        return;
    }

    $id='';
    $name='';
    $gender='';
    $phonenumber='';
    $birth='';

    $jwt = substr($_POST['jwt'], 0, strlen($_POST['jwt'])-2);
    $key = $jwt_secret;
    try {
        $seperatedArray = explode('.', $jwt);
        $header = $seperatedArray[0];
        $parameter = $seperatedArray[1];
        $signature = $seperatedArray[2];

        // jwt에서 회원정보 추출
        $info = (array)json_decode(base64_decode($parameter));
        $id = $info['id'];
        $name = $info['name'];
        $gender = $info['gender'];
        $phonenumber = $info['phonenumber'];
        $birth = $info['birth'];

        if(!hash_hmac('sha256', $header.".".$parameter, $jwt_secret) === $signature) {
            header("HTTP/1.0 401 Unauthorized");
            echo 'wrong jwt';
            return;
        }
    } catch (\Exception $e) {
        header("HTTP/1.0 401 Unauthorized");
        echo 'unknown error';
        return;
    }
?>