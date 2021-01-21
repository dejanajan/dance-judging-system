<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $competition_num_round = (int)trim($request->competition_num_round);
        $competition_num_couples = (int)trim($request->competition_num_couples);


        $sql = "INSERT INTO `round` (`competition_event`, `competition_num_round`, `competition_num_couples`) VALUES ((SELECT competition_event FROM competition ORDER BY competition.competition_id DESC LIMIT 1), '{$competition_num_round}', '{$competition_num_couples}')";
        
        
        if (mysqli_query($con, $sql))
        {
            http_response_code(200);
        } else {
            http_response_code(422);
        }

    }

?>