<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $couple_id = (int)trim($request->couple_id);
        $round_id = (int)trim($request->round_id);
        $adjucator_id = (int)trim($request->adjucator_id);
        $dance_id = (int)trim($request->dance_id);
        $mark = floatval($request->mark);


    $sql = "INSERT INTO `results` (`couple_id`, `round_id`, `adjucator_id`, `dance_id`, `mark`) VALUES ('{$couple_id}', '{$round_id}', '{$adjucator_id}', '{$dance_id}', '{$mark}')";

    if (mysqli_query($con, $sql))
        {
            http_response_code(201);
        } else {
            http_response_code(422);
        }

    }

?>