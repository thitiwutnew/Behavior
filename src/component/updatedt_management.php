<?php
    include("connectdb.php"); 
    $query = 'SELECT * FROM dt_management ORDER  BY dm_id DESC';
$result = $link->query($query);
$consoles = array();
while($row = mysqli_fetch_assoc($result)){
    $consoles[]=$row;
}

echo json_encode($consoles);
    
    $result->close();
    $link->close();

    
?>