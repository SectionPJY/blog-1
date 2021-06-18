<?php
	include "./db.php";

	if($_POST['id'] == "" || $_POST['password'] == "") {
		echo '<script> location.href="./login.php"; </script';
	} else {
		$id = $_POST['id'];
		$pwd = $_POST['password'];

		$sql = mysqli_query($conn, "SELECT * FROM user WHERE id='".$id."'") or die ("알 수 없는 오류");
		$member = $sql->fetch_array();
		$hash_pwd = $member['password'];

		if(password_verify($pwd, $hash_pwd)) {
			$_SESSION['id'] = $member["id"];
			$_SESSION['name'] = $member["name"];

			echo "<script> alert('로그인 되었습니다'); location.href='./index.php'; </script>";
		} else {
			echo "<script> alert('아이디 또는 비밀번호를 확인해주세요.'); history.back(); </script>";
		}
	}
?>
