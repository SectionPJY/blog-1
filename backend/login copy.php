<?php

	session_start();

	$conn = mysqli_connect("localhost", "root", "928oskawk#A", "blog");	/* MySQL PHP 연동 */
	$conn->set_charset("utf8");

	$id =  $_POST['id'];
	$password =  $_POST['password'];

	$sql = mysqli_query($conn, "SELECT * FROM user WHERE id='".$id."'") or die ("알 수 없는 오류");
	$member = $sql->fetch_array();

	if($member['password'] == $password) {
		$_SESSION['id'] = $member["id"];
		$_SESSION['name'] = $member["name"];

		header("HTTP/1.0 202 Accepted");
	} else {
		header("HTTP/1.0 401 Unauthorized");
	}
?>
