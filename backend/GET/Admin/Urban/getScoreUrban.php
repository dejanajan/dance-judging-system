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

        $sql = "SELECT DISTINCT(urban_ranking.team_id), heat.heat_name, urban_age_group.urban_age_name, urban_dance_style.urban_ds_name, urban_dance_category.urban_dc_name, urban_ranking.urban_ranking_score
        FROM urban_ranking 
        INNER JOIN heat ON heat.heat_id=urban_ranking.round_id
        INNER JOIN urban_age_group ON urban_age_group.urban_age_group_id=urban_ranking.urban_age_group
        INNER JOIN urban_dance_category ON urban_dance_category.urban_dc_id=urban_ranking.urban_dance_category
        INNER JOIN urban_dance_style ON urban_dance_style.urban_dance_style_id=urban_ranking.urban_dance_style
        WHERE urban_ranking.urban_dance_style = '{$dance_style}' AND urban_ranking.urban_dance_category = '{$dance_category}' AND urban_ranking.urban_age_group = '{$age_group}' AND urban_ranking.round_id = '{$round}' ORDER BY urban_ranking.urban_ranking_score DESC";
    
    
        if($result = mysqli_query($con,$sql)) {
            $i = 0;
            while($row = mysqli_fetch_assoc($result)) {
                $list[$i]['team_id'] = $row['team_id'];
                $list[$i]['heat_name'] = $row['heat_name'];
                $list[$i]['urban_age_name'] = $row['urban_age_name'];
                $list[$i]['urban_ds_name'] = $row['urban_ds_name'];            
                $list[$i]['urban_dc_name'] = $row['urban_dc_name'];
                $list[$i]['urban_ranking_score'] = $row['urban_ranking_score'];
                $i++;
            }
    
            echo json_encode($list);
        }
        else {
            http_response_code(404);
        }
   
}

?>