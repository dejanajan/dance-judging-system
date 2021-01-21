<?php
/**
 * Returns the list of policies.
 */
require '../../../backend/database.php';

$list = [];
$sql = "SELECT comp_event_id, comp_event_name FROM competition_event";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['comp_event_id'] = $row['comp_event_id'];
        $list[$i]['comp_event_name'] = $row['comp_event_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}