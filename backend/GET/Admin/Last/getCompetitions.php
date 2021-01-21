<?php
/**
 * Returns the list of couples.
 */
require '../../../../backend/database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    $request = json_decode($postdata);

    $competition_event = (int)$request->competition_event;

    $list = [];

    $sql = "SELECT DISTINCT(adj_sign_name), competition_date, name, surname, comp_event_name, last_ds_name, last_dc_name, last_age_name, heat_name, component_name, component_shortname FROM competition 
    INNER JOIN round ON competition.competition_event=round.competition_event
    INNER JOIN adjucator_round ON adjucator_round.competition_event=competition.competition_event
    INNER JOIN adjucator_sign ON adjucator_sign.adj_sign_id = adjucator_round.competition_adjucator_sign
    INNER JOIN competition_event ON competition_event.comp_event_id = competition.competition_event
    INNER JOIN last_dance_style ON last_dance_style.last_dance_style_id = competition.competition_style
    INNER JOIN last_dance_category ON last_dance_category.last_dance_cat_id = competition.competition_category
    INNER JOIN last_age_group ON last_age_group.last_age_group_id = competition.competition_age_group
    INNER JOIN heat ON heat.heat_id = competition.competition_num_round
    INNER JOIN component ON component.component_id = adjucator_round.competition_adj_component
    INNER JOIN users ON users.user_id=adjucator_round.competition_adjucator_id WHERE competition.competition_event = '{$competition_event}'";

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['adjucator_sign'] = $row['adj_sign_name'];
            $list[$i]['competition_date'] = $row['competition_date'];
            $list[$i]['name'] = $row['name'];
            $list[$i]['surname'] = $row['surname'];
            $list[$i]['comp_event_name'] = $row['comp_event_name'];
            $list[$i]['dance_style'] = $row['last_ds_name'];
            $list[$i]['dance_category'] = $row['last_dc_name'];
            $list[$i]['age'] = $row['last_age_name'];
            $list[$i]['round'] = $row['heat_name'];
            $list[$i]['component'] = $row['component_name'];
            $list[$i]['component_shortname'] = $row['component_shortname'];
            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}
?>