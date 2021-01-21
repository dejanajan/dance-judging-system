<?php
/**
 * Returns the list of rounds.
 */
require '../../../backend/database.php';

$list = [];
$sql = "SELECT heat_id, heat_name FROM heat";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['heat_id'] = $row['heat_id'];
        $list[$i]['heat_name'] = $row['heat_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}