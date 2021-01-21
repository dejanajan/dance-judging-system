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

    $sql = "SELECT team_name, team_id, team_studio, urban_dance_style.urban_ds_name, urban_dance_category.urban_dc_name, urban_age_group.urban_age_name FROM urban_team 
    INNER JOIN urban_age_group ON urban_age_group.urban_age_group_id = urban_team.team_age_group
    INNER JOIN urban_dance_category ON urban_dance_category.urban_dc_id = urban_team.team_category
    INNER JOIN urban_dance_style ON urban_dance_style.urban_dance_style_id = urban_team.team_style
    WHERE urban_team.team_age_group = '{$age_group}' AND urban_team.team_category = '{$dance_category}' AND urban_team.team_style = '{$dance_style}'";

    if($result = mysqli_query($con,$sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $list[$i]['team_name'] = $row['team_name'];
            $list[$i]['team_id'] = $row['team_id'];
            $list[$i]['team_studio'] = $row['team_studio'];
            $list[$i]['dance_style'] = $row['urban_ds_name'];
            $list[$i]['dance_category'] = $row['urban_dc_name'];
            $list[$i]['age'] = $row['urban_age_name'];

            $i++;
        }

        echo json_encode($list);
    }
    else {
        http_response_code(404);
    }
}
?>