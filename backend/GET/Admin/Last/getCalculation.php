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
    $couple_id = (int)$request->couple_id;

    $list = [];
    
    $sql = "SELECT DISTINCT(dance_couple.couple_id), mark
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
    WHERE competition.competition_num_round = '{$round}' AND dance_couple.couple_id = '{$couple_id}'
    AND competition.competition_style='{$dance_style}' AND competition.competition_category='{$dance_category}' AND competition.competition_age_group='{$age_group}'";

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['couple_id'] = $row['couple_id'];
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