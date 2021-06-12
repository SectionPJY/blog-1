<?php
	include "./db.php";
	include "./jwt.php";

	if($_POST['id'] == "" || $_POST['password'] == "" || $_POST['passwordCheck'] == "" || $_POST['name'] == "") {	// 입력사항을 입력하지 않으면 
		header('HTTP/1.1 400 Bad Request');
	} else {
		if($_POST['password'] != $_POST['passwordCheck']) {	// 패스워드가 일치하지 않으면
			header('HTTP/1.1 400 Bad Request');
		} else {
			$sql = mysqli_query($conn, "SELECT EXISTS (SELECT * FROM user WHERE id='".$_POST['id']."') as success");
			$usernamecount = $sql->fetch_array();

			if($usernamecount['success'] == 1) {
				header('HTTP/1.1 401 Unauthorized');
			} else {
				$id = $_POST['id'];
				$name = $_POST['name'];
				$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
				$date = date("Y-m-d", time());
				$gender = $_POST['gender'];
				$phonenumber = $_POST['tel'];
				$result = mysqli_query($conn, "INSERT INTO user VALUES"."('".$id."',"."'$name',"."'$password',"."'$gender',"."'$phonenumber',"."' $date ')") or die ("알 수 없는 오류");

				$array = array(
					"id" => $id,
					"name" => $name,
					"gender" => $gender,
					"tel" => $phonenumber,
					"birth" => $date,
				);

				header("HTTP/1.0 202 Accepted");
				echo makeJWT($array);
				
			}
		}
	}
?>
