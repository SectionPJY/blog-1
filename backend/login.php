<?php

	session_start();

	$conn = mysqli_connect("localhost", "root", "928oskawk#A", "blog");	/* MySQL PHP 연동 */
	$conn->set_charset("utf8");

	function mq($sql) {
		global $conn;
		return $conn->query($sql);
	}
?>


<?php
	$id =  $_GET['id'];
	$password =  $_GET['password'];

	$sql = mysqli_query($conn, "SELECT * FROM user WHERE id='".$id."'") or die ("알 수 없는 오류");
	$member = $sql->fetch_array();

	if($member['password'] == $password) {
		$_SESSION['id'] = $member["id"];
		$_SESSION['name'] = $member["name"];

		echo "<script> alert('로그인 되었습니다'); location.href='./index.php'; </script>";
	} else {
		echo "<script> alert('아이디 또는 비밀번호를 확인해주세요.'); </script>";
	}
?>
