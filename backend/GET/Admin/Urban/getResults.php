<?php

/**
 * Returns the list of marks per couple.
 */
require '../../../../backend/database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    $request = json_decode($postdata);

    $round = (int)$request->round;
    $dance_style = (int)$request->dance_style;
    $dance_category = (int)$request->dance_category;
    $age_group = (int)$request->age_group;

    $list = [];

    $sql = "SELECT DISTINCT(urban_team.team_id), mark, urban_adjucator_round.competition_adjucator_sign, adjucator_sign.adj_sign_name, urban_competition.competition_num_round, heat.heat_name, urban_age_group.urban_age_name, urban_dance_style.urban_ds_name, urban_dance_category.urban_dc_name FROM urban_result
            INNER JOIN urban_team ON urban_result.team_id = urban_team.team_id
            INNER JOIN urban_round ON urban_result.round_id=urban_round.competition_num_round
            INNER JOIN urban_adjucator_round ON urban_adjucator_round.competition_adjucator_id=urban_result.adjucator_id
            INNER JOIN urban_competition ON urban_competition.competition_event=urban_round.competition_event
            INNER JOIN adjucator_sign ON adjucator_sign.adj_sign_id=urban_adjucator_round.competition_adjucator_sign
            INNER JOIN heat ON heat.heat_id=urban_round.competition_num_round
            INNER JOIN urban_age_group ON urban_age_group.urban_age_group_id=urban_competition.competition_age_group
            INNER JOIN urban_dance_category ON urban_dance_category.urban_dc_id=urban_competition.competition_category
            INNER JOIN urban_dance_style ON urban_dance_style.urban_dance_style_id=urban_competition.competition_style
            WHERE urban_competition.competition_num_round = '{$round}'
            AND urban_competition.competition_style='{$dance_style}' AND urban_competition.competition_category='{$dance_category}' AND urban_competition.competition_age_group='{$age_group}' ORDER BY urban_team.team_id ASC, adjucator_sign.adj_sign_name ASC";
    

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['team_id'] = $row['team_id'];
            $list[$i]['competition_adjucator_sign'] = $row['competition_adjucator_sign'];
            $list[$i]['adj_sign_name'] = $row['adj_sign_name'];
            $list[$i]['competition_num_round'] = $row['competition_num_round'];
            $list[$i]['urban_age_name'] = $row['urban_age_name'];
            $list[$i]['urban_ds_name'] = $row['urban_ds_name'];
            $list[$i]['urban_dc_name'] = $row['urban_dc_name'];
            $list[$i]['heat_name'] = $row['heat_name'];
            $list[$i]['mark'] = $row['mark'];
            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}

?>