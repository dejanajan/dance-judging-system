<?php
/**
 * Returns the list of policies.
 */
require '../../../../backend/database.php';

$list = [];
$sql = "SELECT component_id, component_name, component_shortname FROM component";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['component_id'] = $row['component_id'];
        $list[$i]['component_name'] = $row['component_name'];
        $list[$i]['component_shortname'] = $row['component_shortname'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}