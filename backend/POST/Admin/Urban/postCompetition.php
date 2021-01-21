<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $competition_date = $request->competition_date;
        $competition_event = (int)trim($request->competition_event);
        $competition_style = (int)$request->competition_style;
        $competition_category = (int)trim($request->competition_category);
        $competition_age_group = (int)trim($request->competition_age_group);
        $competition_num_round = (int)trim($request->competition_num_round);
        $competition_num_team = (int)trim($request->competition_num_team);

        
    $sql = "INSERT INTO `urban_competition` (`competition_date`, `competition_event`, `competition_style`, `competition_category`, `competition_age_group`, `competition_num_round`, `competition_num_teams`) VALUES ((DATE '{$competition_date}'), '{$competition_event}', '{$competition_style}', '{$competition_category}', '{$competition_age_group}', '{$competition_num_round}', '{$competition_num_team}')";


    if (mysqli_query($con, $sql))
        {
            http_response_code(201);
        } else {
            http_response_code(422);
        }

    }

?>