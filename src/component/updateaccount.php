<?php
    include("connectdb.php"); 
    $query = 'SELECT * FROM account';

//get the results
$result = $link->query($query);
//setup array to hold information
$consoles = array();

//setup holders for the different types so that we can filter out the data
$consoleId = 0;
$modelId = 0;

//setup to hold our current index
$consoleIndex = -1;
$modelIndex = -1;

//go through the rows
while($row = mysqli_fetch_assoc($result)){
    if($consoleId != $row['acc_id']){
        $consoleIndex++;
        $modelIndex = -1;
        $consoleId = $row['acc_id'];

        //add the console
        $consoles[$consoleIndex]['acc_id'] = $row['acc_id'];
        $consoles[$consoleIndex]['acc_rank'] = $row['acc_rank'];
        $consoles[$consoleIndex]['acc_name'] = $row['acc_name'];
        $consoles[$consoleIndex]['acc_username'] = $row['acc_username'];
        $consoles[$consoleIndex]['acc_password'] = $row['acc_password'];
        $consoles[$consoleIndex]['acc_status'] = $row['acc_status'];
        $consoles[$consoleIndex]['acc_chk'] = $row['acc_chk'];

    }

}

echo json_encode($consoles);
    
    $result->close();
    $link->close();

    
?>