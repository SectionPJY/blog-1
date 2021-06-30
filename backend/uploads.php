<?php
	include "./db.php";
	$uploads_dir = './uploads';

	/*
	// 파일 받기 1번
	$files = $_FILES

	// 파일 받기 2번
	$files = array();
	for($i = 0; $i <= count($_FILES); $i++) {
		$files[i] = $_FILES[i];
	}
	*/

	// 바로 올리기
	for($i = 0; $i <= count($_FILES); $i++) {
		if($_FILES[$i]['tmp_name']) {
			$files = $uploads_dir . basename($_FILES[$i]["name"]);

			move_uploaded_file($_FILES[i], $files);
		} else {
			echo "Error";
		}
	}	
?>
