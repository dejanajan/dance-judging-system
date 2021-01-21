<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $team_id = (int)trim($request->team_id);
        $round_id = (int)trim($request->round_id);
        $ranking_dance_style = (int)trim($request->ranking_dance_style);
        $ranking_dance_category = (int)trim($request->ranking_dance_category);
        $ranking_age_group = (int)trim($request->ranking_age_group);
        $ranking_end_score = floatval($request->ranking_end_score);


        $sql = "INSERT INTO `urban_ranking` (`team_id`, `round_id`, `urban_dance_style`, `urban_age_group`, `urban_dance_category`, `urban_ranking_score`) VALUES ('{$team_id}', '{$round_id}', '{$ranking_dance_style}', '{$ranking_age_group}', '{$ranking_dance_category}', '{$ranking_end_score}')";

        $sql2 = "SELECT * FROM urban_ranking WHERE round_id='{$round_id}' AND urban_dance_style='{$ranking_dance_style}' AND urban_dance_category='{$ranking_dance_category}' AND urban_age_group = '{$ranking_age_group}' AND team_id = '{$team_id}'";
        $result = mysqli_query($con, $sql2);

        if(mysqli_num_rows($result) != 0){
            http_response_code(501);
        } else {
            if (mysqli_query($con, $sql)){
                http_response_code(201);
            } else {
                http_response_code(422);
            }
        }
    }   

?>