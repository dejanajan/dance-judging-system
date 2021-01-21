<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $team_name = $request->team_name;
        $team_studio = $request->team_studio;
        $team_id = (int)$request->team_id;
        $team_style = (int)trim($request->team_style);
        $team_category = (int)trim($request->team_category);
        $age_group = (int)trim($request->age_group);
        
    $sql = "INSERT INTO `urban_team` (`team_name`, `team_studio`, `team_id`, `team_style`, `team_category`, `team_age_group`) VALUES ( '{$team_name}', '{$team_studio}', '{$team_id}', '{$team_style}', '{$team_category}', '{$age_group}')";

    if (mysqli_query($con, $sql))
        {
            http_response_code(201);
        } else {
            http_response_code(422);
        }
    }

?>