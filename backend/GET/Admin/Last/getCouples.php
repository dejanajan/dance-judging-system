<?php
/**
 * Returns the list of couples.
 */
require '../../../../backend/database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    $request = json_decode($postdata);

    $dance_style = (int)$request->dance_style;
    $dance_category = (int)$request->dance_category;
    $age_group = (int)$request->age_group;

    $list = [];

    $sql = "SELECT couple_id, last_age_group.last_age_name, last_dance_category.last_dc_name, last_dance_style.last_ds_name, g.dancer_name as gentleman, g.dancer_surname as gentleman_surname, l.dancer_name as lady, l.dancer_surname as lady_surname, g.dance_club as dance_club  FROM dance_couple 
    INNER JOIN last_age_group ON last_age_group.last_age_group_id = dance_couple.dc_age_group
    INNER JOIN last_dance_category ON last_dance_category.last_dance_cat_id = dance_couple.dc_dance_category
    INNER JOIN last_dance_style ON last_dance_style.last_dance_style_id = dance_couple.dc_dance_style
    INNER JOIN dancer as g ON (dance_couple.gentleman_id = g.dancer_id)
    INNER JOIN dancer as l ON (dance_couple.lady_id = l.dancer_id)
    WHERE dance_couple.dc_age_group = '{$age_group}' AND dance_couple.dc_dance_category = '{$dance_category}' AND dance_couple.dc_dance_style = '{$dance_style}'";

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['couple_id'] = $row['couple_id'];
            $list[$i]['last_age_name'] = $row['last_age_name'];
            $list[$i]['last_dc_name'] = $row['last_dc_name'];
            $list[$i]['last_ds_name'] = $row['last_ds_name'];
            $list[$i]['gentleman'] = $row['gentleman'];
            $list[$i]['gentleman_surname'] = $row['gentleman_surname'];
            $list[$i]['lady'] = $row['lady'];
            $list[$i]['lady_surname'] = $row['lady_surname'];
            $list[$i]['dance_club'] = $row['dance_club'];
            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}
?>