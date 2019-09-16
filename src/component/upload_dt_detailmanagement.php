<?php
 
include("connectdb.php"); 
 

$json = file_get_contents('php://input');
 
//  // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
//  // Populate Student name from JSON $obj array and store into $S_Name.
$at_id = $obj['at_id'];
 $dm_id = $obj['dm_id'];
 $dtd_status = $obj['dtd_status'];
 $dtd_location = $obj['dtd_location'];
 $dtd_type = $obj['dtd_type'];
 $dtd_image = $obj['dtd_image'];
 $dtd_date = $obj['dtd_date'];
 $dtd_comment = $obj['dtd_comment'];
 
 $Sql="SELECT dtd_date FROM dt_detailmanagement Where dtd_date='".$dtd_date."'";
 $result = $link->query($Sql);

    if ($result->num_rows > 0) {
        $sql = "UPDATE dt_detailmanagement SET 
        dtd_status = '".$dtd_status."' ,
        dtd_comment = '".$dtd_comment."' 
        WHERE dtd_date = '".$dtd_date."' ";

            $query = mysqli_query($link,$sql);

            if($query) {
                $MSG = 1 ;
            
                // // Converting the message into JSON format.
                $json = json_encode($MSG);
    
                // // Echo the message.
                echo $json ;
            }
            else{
                $MSG = 0 ;
            
                // // Converting the message into JSON format.
                $json = json_encode($MSG);
                
                // // Echo the message.
                echo $json ;
            }
    }
    else{
        $Sql_Query = "insert into dt_detailmanagement (at_id,dm_id,dtd_status,dtd_location,dtd_type,dtd_image,dtd_date,dtd_comment) values ('$at_id','$dm_id','$dtd_status','$dtd_location','$dtd_type','$dtd_image','$dtd_date','$dtd_comment')";
 
 
            if(mysqli_query($link,$Sql_Query)){
            // If the record inserted successfully then show the message.
            $MSG = 1 ;
            
            // // Converting the message into JSON format.
            $json = json_encode($MSG);

            // // Echo the message.
            echo $json ;
            
            }
            else{
            
                $MSG = 0 ;
            
                // // Converting the message into JSON format.
                $json = json_encode($MSG);
                
                // // Echo the message.
                echo $json ;
            
            }
    }
 mysqli_close($link);
?>