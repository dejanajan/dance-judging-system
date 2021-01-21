<?php
/**
 * Returns the list of adjucators.
 */
require '../../../../backend/database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    $request = json_decode($postdata);

    $username = $request->username;
    $dance_style = (int)$request->dance_style;
    $dance_category = (int)$request->dance_category;
    $age_group = (int)$request->age_group;

    $list = [];
    
    $sql = "SELECT DISTINCT(urban_team.team_id) as team_id, urban_team.id as row_id, urban_round.competition_event, urban_adjucator_round.competition_adjucator_id as adj_id, heat.heat_name as heat_name, urban_team.team_name, urban_team.team_studio FROM urban_competition
    INNER JOIN urban_round ON urban_competition.competition_event = urban_round.competition_event AND urban_round.competition_event = '1'
    INNER JOIN urban_adjucator_round ON urban_adjucator_round.round_id=urban_round.competition_num_round
    INNER JOIN urban_team ON urban_team.team_style='{$dance_style}' AND urban_team.team_category='{$dance_category}' AND urban_team.team_age_group='{$age_group}'
    INNER JOIN heat ON heat.heat_id = urban_round.competition_num_round
    INNER JOIN users ON users.user_id=urban_adjucator_round.competition_adjucator_id WHERE users.username = '{$username}'";


    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['team_id'] = $row['team_id'];
            $list[$i]['row_id'] = $row['row_id'];
            $list[$i]['competition_event'] = $row['competition_event'];
            $list[$i]['adj_id'] = $row['adj_id'];
            $list[$i]['heat_name'] = $row['heat_name'];
            $list[$i]['team_name'] = $row['team_name'];
            $list[$i]['team_studio'] = $row['team_studio'];
            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}

?>