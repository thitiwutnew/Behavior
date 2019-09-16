<?php
 
include("connectdb.php"); 
 

$json = file_get_contents('php://input');
 
//  // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
//  // Populate Student name from JSON $obj array and store into $S_Name.
 $acc_id = $obj['acc_id'];
 $acc_rank = $obj['acc_rank'];
 $acc_name = $obj['acc_name'];
 $acc_username = $obj['acc_username'];
 $acc_password = $obj['acc_password'];
 $acc_status = $obj['acc_status'];
 $acc_chk = $obj['acc_chk'];
 
 $Sql="SELECT acc_id FROM account Where acc_id='".$acc_id."'";
 $result = $link->query($Sql);

    if ($result->num_rows > 0) {
        $sql = "UPDATE account SET 
        acc_password = '".$acc_password."' ,
        acc_chk = '".$acc_chk."' 
        WHERE acc_id = '".$acc_id."' ";

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
        $Sql_Query = "insert into account (acc_rank,acc_name,acc_username,acc_password,acc_status,acc_chk) values ('$acc_rank','$acc_name','$acc_username','$acc_password','$acc_status','$acc_chk')";
 
 
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