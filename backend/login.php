<?php
	include "./db.php";
	include "./jwt.php";

	$id =  $_POST['id'];
	$password =  $_POST['password'];

	$sql = mysqli_query($conn, "SELECT * FROM user WHERE id='".$id."'") or die ("알 수 없는 오류");
	$member = $sql->fetch_array();

	if(password_verify($password, $member['password'])) {
		$array = array(
			"id" => $member['id'],
			"name" => $member["name"],
			"gender" => $member["gender"],
			"tel" => $member["phonenumber"],
			"birth" => $member["birth"]
		);

		$jwt = makeJWT($array);

		header("HTTP/1.0 202 Accepted");
        echo $jwt;
	} else {
		header("HTTP/1.0 401 Unauthorized");
	}
?>
