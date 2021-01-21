<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $competition_num_round = (int)trim($request->competition_num_round);
        $competition_num_team = (int)trim($request->competition_num_team);


        $sql = "INSERT INTO `urban_round` (`competition_event`, `competition_num_round`, `competition_num_team`) VALUES ((SELECT competition_event FROM urban_competition ORDER BY urban_competition.competition_id DESC LIMIT 1), '{$competition_num_round}', '{$competition_num_team}')";
        
        
        if (mysqli_query($con, $sql))
        {
            http_response_code(200);
        } else {
            http_response_code(422);
        }

    }

?>