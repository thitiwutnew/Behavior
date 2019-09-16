<?php
    include("connectdb.php"); 
    $query = 'SELECT * FROM authorities';

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
    if($consoleId != $row['at_id']){
        $consoleIndex++;
        $modelIndex = -1;
        $consoleId = $row['at_id'];

        //add the console
        $consoles[$consoleIndex]['at_id'] = $row['at_id'];
        $consoles[$consoleIndex]['at_code'] = $row['at_code'];
        $consoles[$consoleIndex]['at_name'] = $row['at_rank']." ".$row['at_name'];
        $consoles[$consoleIndex]['at_position'] = $row['at_position'];
        $consoles[$consoleIndex]['at_image'] = $row['at_image'];

    }

}

echo json_encode($consoles);
    
    $result->close();
    $link->close();

    
?>