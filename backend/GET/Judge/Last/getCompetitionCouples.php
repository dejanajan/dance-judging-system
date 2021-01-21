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
    $adj_component = (int)$request->adj_component;

    $list = [];
    
    $sql = "SELECT DISTINCT(dance_couple.couple_id) as couple_id, dance_couple.dance_couple_id as dance_couple_id, round.competition_event as round_id, adjucator_round.adj_round_id as adj_round_id, adjucator_round.competition_adjucator_id as adj_id, heat.heat_name as heat_name FROM competition
            INNER JOIN round ON competition.competition_event = round.competition_event
            INNER JOIN adjucator_round ON adjucator_round.round_id=round.competition_num_round AND adjucator_round.competition_adj_component='{$adj_component}'
            INNER JOIN dance_couple ON dance_couple.dc_dance_style='{$dance_style}' AND dance_couple.dc_dance_category='{$dance_category}' AND dance_couple.dc_age_group='{$age_group}'
            INNER JOIN heat ON heat.heat_id = round.competition_num_round
            INNER JOIN users ON users.user_id=adjucator_round.competition_adjucator_id WHERE users.username = '{$username}'";

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['couple_id'] = $row['couple_id'];
            $list[$i]['dance_couple_id'] = $row['dance_couple_id'];
            $list[$i]['round_id'] = $row['round_id'];
            $list[$i]['adj_round_id'] = $row['adj_round_id'];
            $list[$i]['adj_id'] = $row['adj_id'];
            $list[$i]['heat_name'] = $row['heat_name'];
            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}

?>