<?php
/**
 * Returns the list of policies.
 */
require '../../../../backend/database.php';

$list = [];
$sql = "SELECT last_age_group_id, last_age_name FROM last_age_group";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['last_age_group_id'] = $row['last_age_group_id'];
        $list[$i]['last_age_name'] = $row['last_age_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}