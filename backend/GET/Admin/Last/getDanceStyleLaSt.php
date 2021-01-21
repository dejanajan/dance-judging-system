<?php
/**
 * Returns the list of policies.
 */
require '../../../../backend/database.php';

$list = [];
$sql = "SELECT last_dance_style_id, last_ds_name FROM last_dance_style";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['last_dance_style_id'] = $row['last_dance_style_id'];
        $list[$i]['last_ds_name'] = $row['last_ds_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}