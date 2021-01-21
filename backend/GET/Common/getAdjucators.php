<?php
/**
 * Returns the list of couples.
 */
require '../../../backend/database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    $request = json_decode($postdata);

    $occupation_id = (int)$request->occupation_id;

    $list = [];

    $sql = "SELECT name, surname, dance_studio, country FROM users 
    WHERE users.flag_adjucator = 1 AND users.flag_dance_category = '{$occupation_id}'";

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['name'] = $row['name'];
            $list[$i]['surname'] = $row['surname'];
            $list[$i]['dance_studio'] = $row['dance_studio'];
            $list[$i]['country'] = $row['country'];

            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}
?>