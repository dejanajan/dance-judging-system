<?php
/**
 * Returns the list of policies.
 */
require '../../../../backend/database.php';

$list = [];
$sql = "SELECT urban_dc_id, urban_dc_name FROM urban_dance_category";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['urban_dc_id'] = $row['urban_dc_id'];
        $list[$i]['urban_dc_name'] = $row['urban_dc_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}