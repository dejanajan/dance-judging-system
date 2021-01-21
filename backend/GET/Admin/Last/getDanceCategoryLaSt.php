<?php
/**
 * Returns the list of policies.
 */
require '../../../../backend/database.php';

$list = [];
$sql = "SELECT last_dance_cat_id, last_dc_name FROM last_dance_category";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['last_dance_cat_id'] = $row['last_dance_cat_id'];
        $list[$i]['last_dc_name'] = $row['last_dc_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}