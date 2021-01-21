<?php
/**
 * Returns the list of adjucators.
 */
require '../../../backend/database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    $request = json_decode($postdata);

    $flag_dance_category = (int)$request->flag_dance_category;

    $list = [];
    $sql = "SELECT user_id, name, surname FROM users WHERE flag_dance_category = '{$flag_dance_category}'";

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['user_id'] = $row['user_id'];
            $list[$i]['name'] = $row['name'];
            $list[$i]['surname'] = $row['surname'];
            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}

?>