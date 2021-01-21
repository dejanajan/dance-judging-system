<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $team_id = (int)trim($request->team_id);
        $round_id = (int)trim($request->round_id);
        $adjucator_id = (int)trim($request->adjucator_id);
        $mark = floatval($request->mark);


    $sql = "INSERT INTO `urban_result` (`team_id`, `round_id`, `adjucator_id`, `mark`) VALUES ('{$team_id}', '{$round_id}', '{$adjucator_id}', '{$mark}')";

    if (mysqli_query($con, $sql))
        {
            http_response_code(201);
        } else {
            http_response_code(422);
        }

    }

?>