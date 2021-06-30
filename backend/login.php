<?php
	include "./db.php";
	include("./jwt.php");

	$id =  $_POST['id'];
	$password =  $_POST['password'];
	
	$sql = mysqli_query($conn, "SELECT * FROM user WHERE id='".$id."'") or die ("알 수 없는 오류");
	$member = $sql->fetch_array(MYSQLI_ASSOC);
	$hash_pwd = $member['password'];

	if(password_verify($password, $hash_pwd)) {
		unset($member['password']);
		$result = json_encode($member);

		$header = json_encode(array(
			"alg" => "HS256",
			"typ" => "JWT"
			)
		);

		$header = base64_encode($header);
		$result = base64_encode($result);

		$hp = $header.".".$result;
		$jwt = $hp.".".hash_hmac('sha256', $hp, $jwt_secret);
		
		echo $jwt;

	} else {
		header("HTTP/1.0 401 Unauthorized");
	}
?>

