<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $couple_id = (int)trim($request->couple_id);
        $round_id = (int)trim($request->round_id);
        $ranking_dance_style = (int)trim($request->ranking_dance_style);
        $ranking_dance_category = (int)trim($request->ranking_dance_category);
        $ranking_age_group = (int)trim($request->ranking_age_group);
        $ranking_end_score = floatval($request->ranking_end_score);


        $sql = "INSERT INTO `ranking` (`couple_id`, `round_id`, `ranking_dance_style`, `ranking_dance_category`, `ranking_age_group`, `ranking_end_score`) VALUES ('{$couple_id}', '{$round_id}', '{$ranking_dance_style}', '{$ranking_dance_category}', '{$ranking_age_group}', '{$ranking_end_score}')";

        $sql2 = "SELECT * FROM ranking WHERE round_id='{$round_id}' AND ranking_dance_style='{$ranking_dance_style}' AND ranking_dance_category='{$ranking_dance_category}' AND ranking_age_group = '{$ranking_age_group}' AND couple_id = '{$couple_id}'";
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