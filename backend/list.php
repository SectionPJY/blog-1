<?php
     include('./db.php');

     $page = ($_POST['page']-1)*10;
     $sql = mysqli_query($conn, "select * from post limit ${page}, 5");
     
     $array = array();
     while ($list = $sql->fetch_array(MYSQLI_ASSOC)) {
         array_push($array, $list);
     }
     echo json_encode($array);
?>