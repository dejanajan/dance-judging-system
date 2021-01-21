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
    $last_dance_id = (int)$request->last_dance_id;

    $list = [];
    if ($last_dance_id === 0){
        $sql = "SELECT DISTINCT(dance_couple.couple_id), last_dance.last_dance_shortname, mark, adjucator_round.competition_adjucator_sign, adjucator_sign.adj_sign_name, competition.competition_num_round, heat.heat_name, last_age_group.last_age_name, last_dance_style.last_ds_name, last_dance_category.last_dc_name
        FROM results 
        INNER JOIN dance_couple ON results.couple_id = dance_couple.couple_id
        INNER JOIN last_dance ON results.dance_id=last_dance.last_dance_id
        INNER JOIN round ON results.round_id=round.competition_num_round
        INNER JOIN adjucator_round ON adjucator_round.competition_adjucator_id=results.adjucator_id
        INNER JOIN competition ON competition.competition_event=round.competition_event
        INNER JOIN adjucator_sign ON adjucator_sign.adj_sign_id=adjucator_round.competition_adjucator_sign
        INNER JOIN heat ON heat.heat_id=round.competition_num_round
        INNER JOIN last_age_group ON last_age_group.last_age_group_id=competition.competition_age_group
        INNER JOIN last_dance_category ON last_dance_category.last_dance_cat_id=competition.competition_category
        INNER JOIN last_dance_style ON last_dance_style.last_dance_style_id=competition.competition_style
        WHERE competition.competition_num_round = '{$round}'
        AND competition.competition_style='{$dance_style}' AND competition.competition_category='{$dance_category}' AND competition.competition_age_group='{$age_group}' ORDER BY dance_couple.couple_id ASC, adjucator_sign.adj_sign_name ASC";
    } else {
        $sql = "SELECT DISTINCT(dance_couple.couple_id), last_dance.last_dance_shortname, mark, adjucator_round.competition_adjucator_sign, adjucator_sign.adj_sign_name, competition.competition_num_round, heat.heat_name, last_age_group.last_age_name, last_dance_style.last_ds_name, last_dance_category.last_dc_name
        FROM results 
        INNER JOIN dance_couple ON results.couple_id = dance_couple.couple_id
        INNER JOIN last_dance ON results.dance_id=last_dance.last_dance_id
        INNER JOIN round ON results.round_id=round.competition_num_round
        INNER JOIN adjucator_round ON adjucator_round.competition_adjucator_id=results.adjucator_id
        INNER JOIN competition ON competition.competition_event=round.competition_event
        INNER JOIN adjucator_sign ON adjucator_sign.adj_sign_id=adjucator_round.competition_adjucator_sign
        INNER JOIN heat ON heat.heat_id=round.competition_num_round
        INNER JOIN last_age_group ON last_age_group.last_age_group_id=competition.competition_age_group
        INNER JOIN last_dance_category ON last_dance_category.last_dance_cat_id=competition.competition_category
        INNER JOIN last_dance_style ON last_dance_style.last_dance_style_id=competition.competition_style
        WHERE competition.competition_num_round = '{$round}'
        AND competition.competition_style='{$dance_style}' AND competition.competition_category='{$dance_category}' AND competition.competition_age_group='{$age_group}' AND last_dance.last_dance_id='{$last_dance_id}' ORDER BY dance_couple.couple_id ASC, adjucator_sign.adj_sign_name ASC";
    }
    

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['couple_id'] = $row['couple_id'];
            $list[$i]['last_dance_shortname'] = $row['last_dance_shortname'];
            $list[$i]['competition_adjucator_sign'] = $row['competition_adjucator_sign'];
            $list[$i]['adj_sign_name'] = $row['adj_sign_name'];
            $list[$i]['competition_num_round'] = $row['competition_num_round'];
            $list[$i]['last_ds_name'] = $row['last_ds_name'];
            $list[$i]['last_age_name'] = $row['last_age_name'];
            $list[$i]['last_dc_name'] = $row['last_dc_name'];
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