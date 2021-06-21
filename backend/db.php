<?php	
	$conn = new mysqli("localhost", "root", "", "blog");
	if ($conn->connect_error) {
		echo "Connection failed: " . $conn->connect_error;
	}
?>
