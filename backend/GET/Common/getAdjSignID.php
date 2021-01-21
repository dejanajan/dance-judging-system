<?php
/**
 * Returns the list of policies.
 */
require '../../../backend/database.php';

$list = [];
$sql = "SELECT adj_sign_id, adj_sign_name FROM adjucator_sign";

if($result = mysqli_query($con,$sql)) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $list[$i]['adj_sign_id'] = $row['adj_sign_id'];
        $list[$i]['adj_sign_name'] = $row['adj_sign_name'];
        $i++;
    }

    echo json_encode($list);
}
else {
    http_response_code(404);
}