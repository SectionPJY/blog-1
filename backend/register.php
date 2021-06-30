<?php
	include "./db.php";
	include("./jwt.php");

	if($_POST['id'] == "" || $_POST['password'] == "" || $_POST['passwordCheck'] == "" || $_POST['name'] == "" || $_POST['tel'] == "" || $_POST['gender'] == "" || $_POST['birth'] == "") {	// 입력사항을 입력하지 않으면 
		header('HTTP/1.0 401 Unauthorized');
	} else {
		echo $_POST['id'];

		if($_POST['password'] != $_POST['passwordCheck']) {	// 패스워드가 일치하지 않으면
			header('HTTP/1.0 401 Unauthorized');
		} else {
			$sql = mysqli_query($conn, "SELECT EXISTS (SELECT * FROM user WHERE id='".$_POST['id']."') as success");
			$usernamecount = $sql->fetch_array();

			if($usernamecount['success'] == 1) {
				header('HTTP/1.0 401 Unauthorized');	
			} else {
				$name = $_POST['name'];
				$id = $_POST['id'];
				$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
				$birth = $_POST['birth'];
				$number = $_POST['tel'];
				$gender = $_POST['gender'];

				$query = "INSERT INTO user(id, name, password, gender, phonenumber, birth) VALUES('".$id."','".$name."','".$password."','".$gender."', '".$number."', '".$birth."')";

				$result = mysqli_query($conn, $query) or die ("알 수 없는 오류");

				$member = array('id' => $id, 'name' => $name, 'gender' => $gender, 'phonenumber' => $number, 'birth' => $birth);

				$header = json_encode(array(
						"alg" => "HS256",
						"typ" => "JWT"
					)
				);
				$result = json_encode($member);

				$header = base64_encode($header);
				$result = base64_encode($result);

				$hp = $header.".".$result;
				$jwt = $hp.".".hash_hmac('sha256', $hp, $jwt_secret);

				echo $jwt;

				header('HTTP/1.0 202 Accept');
			}
		}
	}
?>
