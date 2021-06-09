<?php	
	$conn = new mysqli("localhost", "root", "928oskawk#A", "blog");
	if ($conn->connect_error) {
		echo "Connection failed: " . $conn->connect_error;
	}
?>
