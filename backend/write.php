<?php
    include('./check.php');
    include('./db.php');

    // 파일 처리
    $target_dir = "uploads/";
    $targets = array();
    for($i=0; $i<count($_FILES); $i++) {
        // max size를 넘는 이미지는 업로드를 허락하지 않는다.
        if(!$_FILES[$i]['tmp_name']) {
            header("HTTP/1.0 400 Bad Request");
            return;
        }

        // 가짜 이미지일 경우 업로드를 허락하지 않는다.
        $check = getimagesize($_FILES[$i]['tmp_name']);
        if($check === true) {
            header("HTTP/1.0 400 Bad Request");
            return;
        }

        $target_name = date('Y-m-d H:i:s', time()) . $_FILES[$i]['name'];
        $target_name = hash('sha256', $target_name);
        $target = "localhost:80/${target_dir}${target_name}.".$_FILES[$i]['type'];
        array_push($targets, $target);
        if(file_exists($target)) {
            header("HTTP/1.0 409 Conflict");
            return;
        }
    
        if (!move_uploaded_file($_FILES[$i]["tmp_name"], $target)) {
            header("HTTP/1.0 500 Internal Server Error");
            return;
        }
    }

    // 소스코드에 있는 src에 파일 주소 대입하기
    $title = $_POST['title'];
    $content = $_POST['content'];
    $pattern = '/src=""/';
    for($i=0; $i<count($targets); $i++) {
        $content = preg_replace($pattern, 'src="'.$targets[$i].'"', $content, 1);
    }
    $sql = mysqli_query($conn, "insert into post(title, content, author) values('${title}', '${content}', '${id}')") or header("HTTP/1.0 403 Forbidden");

    // 해쉬태그 집어넣기
    $hashtags = (array)json_decode($_POST['hashtags']);
    for($i=0; $i<count($hashtags); $i++) {
        $sql = mysqli_query($conn, "insert into hashtags(hashtag, postId) values('".$hashtags[$i]."', (select id from post order by id desc limit 0,1))") or header("HTTP/1.0 403 Forbidden");
    }
?>