<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $couple_id = (int)$request->couple_id;
        $dance_style = (int)trim($request->dance_style);
        $dance_category = (int)trim($request->dance_category);
        $age_group = (int)trim($request->age_group);
        
    $sql = "INSERT INTO `dance_couple` (`gentleman_id`, `lady_id`, `couple_id`, `dc_dance_style`, `dc_dance_category`, `dc_age_group`) VALUES ((SELECT MAX(dancer_id-1) FROM dancer), (SELECT MAX(dancer_id) FROM dancer), '{$couple_id}', '{$dance_style}', '{$dance_category}', '{$age_group}')";

    if (mysqli_query($con, $sql))
        {
            http_response_code(201);
        } else {
            http_response_code(422);
        }

    }

?>