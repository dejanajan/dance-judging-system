<?php
/**
 * Returns the list of adjucators.
 */
require '../../../../backend/database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    $request = json_decode($postdata);

    $user = $request->user;

    $list = [];
    
    $sql = "SELECT DISTINCT(adj_sign_name), adj_sign_id, users.name, users.surname, competition_event.comp_event_name, urban_dance_style_id, urban_ds_name, urban_dc_id, urban_dc_name, urban_age_group_id, urban_age_name, heat_id, heat_name, flag_dance_category FROM urban_competition
    INNER JOIN urban_round ON urban_competition.competition_event=urban_round.competition_event
    INNER JOIN urban_adjucator_round ON urban_adjucator_round.competition_event=urban_competition.competition_event
    INNER JOIN competition_event ON competition_event.comp_event_id = urban_competition.competition_event
    INNER JOIN adjucator_sign ON adjucator_sign.adj_sign_id = urban_adjucator_round.competition_adjucator_sign
    INNER JOIN urban_dance_style ON urban_dance_style.urban_dance_style_id = urban_competition.competition_style
    INNER JOIN urban_dance_category ON urban_dance_category.urban_dc_id = urban_competition.competition_category
    INNER JOIN urban_age_group ON urban_age_group.urban_age_group_id = urban_competition.competition_age_group
    INNER JOIN heat ON heat.heat_id = urban_competition.competition_num_round
    INNER JOIN users ON users.user_id=urban_adjucator_round.competition_adjucator_id WHERE users.username = '{$user}'";

    if($result = mysqli_query($con, $sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['adj_sign_id'] = $row['adj_sign_id'];
            $list[$i]['adjucator_sign'] = $row['adj_sign_name'];
            $list[$i]['name'] = $row['name'];
            $list[$i]['surname'] = $row['surname'];
            $list[$i]['comp_event_name'] = $row['comp_event_name'];
            $list[$i]['urban_dance_style_id'] = $row['urban_dance_style_id'];
            $list[$i]['urban_ds_name'] = $row['urban_ds_name'];
            $list[$i]['urban_dc_id'] = $row['urban_dc_id'];
            $list[$i]['urban_dc_name'] = $row['urban_dc_name'];
            $list[$i]['urban_age_group_id'] = $row['urban_age_group_id'];
            $list[$i]['urban_age_name'] = $row['urban_age_name'];
            $list[$i]['heat_id'] = $row['heat_id'];
            $list[$i]['heat_name'] = $row['heat_name'];
            $list[$i]['flag_dance_category'] = $row['flag_dance_category'];
            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}

?>