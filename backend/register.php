<?php
	include "./db.php";

	if($_POST['id'] == "" || $_POST['password'] == "" || $_POST['repassword'] == "" || $_POST['name'] == "") {	// 입력사항을 입력하지 않으면 
		echo '<script> location.href="/reg_bk"; </script>';
	} else {
		echo $_POST['id'];

		if($_POST['password'] != $_POST['repassword']) {	// 패스워드가 일치하지 않으면
			echo 1;
			echo '<script> alert("패스워드가 일치하지 않습니다."); history.back(); </script>';
		} else {
			$sql = mysqli_query($conn, "SELECT EXISTS (SELECT * FROM user WHERE id='".$_POST['id']."') as success");
			$usernamecount = sql->fetch_array();

			if($usernamecount['success'] == 1) {
				echo ("<script> alert('아이디가 이미 사용중입니다.'); history.back(); </script>");
			} else {
				$name = $_POST['name'];
				$id = $_POST['id'];
				$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
				$date = date("Y-m-d", time());

				$result = mysqli_query($conn, "INSERT INTO user(id, password, name, created)
					VALUES('".$id."', '".$password."', '".$name."', '".$date."')") or die ("알 수 없는 오류");

				echo ("<script> alert('회원가입이 완료되었습니다.'); location.href='./index.php'; </script>");
			}
		}
	}
?>
