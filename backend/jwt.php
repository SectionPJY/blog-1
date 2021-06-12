<?php
    require_once 'third_party/vendor/autoload.php';
    use Firebase\JWT\JWT;
    define('JWT_SECRET', 'f687f5fbb2c73b6737472a741a0be25e989bc5530635d524d44c420a497068c9dfc5aff447a4664d3b10331780ea981fde2825e6f2da7d7c423b30935f366a7d');
    
    function makeJWT($data) {
        $payload = array(
            "iss" => "rjs595959@Naver.com",
            "aud" => "http://localhost:3000",
            "iat" => time(),
            "exp" => time() + 3600,
            "data" => $data,
        );

        $jwt = JWT::encode($payload, JWT_SECRET);
        return $jwt;
    }
    
?>