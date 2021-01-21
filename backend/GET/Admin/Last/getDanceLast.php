<?php
/**
 * Returns the list of policies.
 */
require '../../../../backend/database.php';

$list = [];
$sql = "SELECT last_dance_id, last_dance_name, last_dance_shortname  FROM last_dance";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['last_dance_id'] = $row['last_dance_id'];
        $list[$i]['last_dance_name'] = $row['last_dance_name'];
        $list[$i]['last_dance_shortname'] = $row['last_dance_shortname'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}