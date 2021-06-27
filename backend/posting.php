<?php
	include "./db.php";

	if($_POST['title'] = "" || $_POST['content'] = "") {
		echo '<script> location.href="/reg_bk"; </script>';
	} else {
		$title = $_POST['title'];
		$contents = $_POST['text'];
		$hashtag = $_POST['hashtag'];
		$author = $_POST['author'];
		$date = date("Y-m-d", time());

		$query = "INSERT INTO post(name, create_time, title, content) VALUES('".$name."','".$date."','".$title."','".$text."')";

		$result = mysqli_query($conn, $query) or die ("알 수 없는 오류");

		$header = json_encode(array(
						"alg" => "HS256",
						"typ" => "JWT"
					)
				);
		$result = json_encode($member);

		$header = base64_encode($header);
		$result = base64_encode($result);

		$hp = $header.".".$result;

		echo $hp.".".hash_hmac('sha256', $hp, 'secret');

		header('HTTP/1.0 202 Accept');
	}
?>
