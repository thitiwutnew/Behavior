<?php
$link = mysqli_connect("127.0.0.1", "root", "123456789", "pp-rbh");

if (!$link) {
    $MSG = 0 ;
    $json = json_encode($MSG);
     echo $json ;
    exit;
}
else{
    $MSG = 1 ;
    $json = json_encode($MSG);
     echo $json ;
     exit;
}
?>