<?php
/**
 * Returns the list of policies.
 */
require '../../../../backend/database.php';

$list = [];
$sql = "SELECT urban_age_group_id, urban_age_name FROM urban_age_group";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['urban_age_group_id'] = $row['urban_age_group_id'];
        $list[$i]['urban_age_name'] = $row['urban_age_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}