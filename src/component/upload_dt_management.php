<?php
 
include("connectdb.php"); 
 

$json = file_get_contents('php://input');
 
//  // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
//  // Populate Student name from JSON $obj array and store into $S_Name.
$dm_id = $obj['dm_id'];
 $dm_prefix = $obj['dm_prefix'];
 $dm_name = $obj['dm_name'];
 $dm_age = $obj['dm_age'];
 $dm_gender = $obj['dm_gender'];
 $dm_idcard = $obj['dm_idcard'];
 $dm_image = $obj['dm_image'];
 $dm_imageurl = $obj['dm_imageurl'];
 
//  // Populate Student Class from JSON $obj array and store into $S_Class.
//  $S_Class = $obj['student_class'];
 
//  // Populate Student Phone Number from JSON $obj array and store into $S_Phone_Number.
//  $S_Phone_Number = $obj['student_phone_number'];
 
//  // Populate Email from JSON $obj array and store into $S_Email.
//  $S_Email = $obj['student_email'];
 
 // Creating SQL query and insert the record into MySQL database table.
 $Sql="SELECT dm_id FROM dt_management Where dm_id='".$dm_id."'";
 $result = $link->query($Sql);

    if ($result->num_rows > 0) {
        $sql = "UPDATE dt_management SET 
        dm_prefix = '".$dm_prefix."' ,
        dm_name = '".$dm_name."' ,
        dm_age = '".$dm_age."' ,
        dm_gender = '".$dm_gender."' ,
        dm_idcard = '".$dm_idcard."' ,
        dm_image = '".$dm_image."'
        WHERE dm_id = '".$dm_id."' ";

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
        $Sql_Query = "insert into dt_management (dm_id,dm_prefix,dm_name,dm_age,dm_gender,dm_idcard,dm_image) values ('$dm_id','$dm_prefix','$dm_name','$dm_age','$dm_gender','$dm_idcard','$dm_image')";
 
 
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