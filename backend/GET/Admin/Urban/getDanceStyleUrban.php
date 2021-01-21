<?php
/**
 * Returns the list of policies.
 */
require '../../../../backend/database.php';

$list = [];
$sql = "SELECT urban_dance_style_id, urban_ds_name FROM urban_dance_style";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['urban_dance_style_id'] = $row['urban_dance_style_id'];
        $list[$i]['urban_ds_name'] = $row['urban_ds_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}