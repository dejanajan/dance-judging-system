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

        $sql = "SELECT DISTINCT(ranking.couple_id), heat.heat_name, last_age_group.last_age_name, last_dance_style.last_ds_name, last_dance_category.last_dc_name,  ranking.ranking_end_score
        FROM ranking 
        INNER JOIN heat ON heat.heat_id=ranking.round_id
        INNER JOIN last_age_group ON last_age_group.last_age_group_id=ranking.ranking_age_group
        INNER JOIN last_dance_category ON last_dance_category.last_dance_cat_id=ranking.ranking_dance_category
        INNER JOIN last_dance_style ON last_dance_style.last_dance_style_id=ranking.ranking_dance_style
        WHERE ranking.ranking_dance_style = '{$dance_style}' AND ranking.ranking_dance_category = '{$dance_category}' AND ranking.ranking_age_group = '{$age_group}' AND ranking.round_id = '{$round}' ORDER BY ranking.ranking_end_score DESC";
    
    
        if($result = mysqli_query($con,$sql)) {
            $i = 0;
            while($row = mysqli_fetch_assoc($result)) {
                $list[$i]['couple_id'] = $row['couple_id'];
                $list[$i]['heat_name'] = $row['heat_name'];
                $list[$i]['last_age_name'] = $row['last_age_name'];
                $list[$i]['last_ds_name'] = $row['last_ds_name'];            
                $list[$i]['last_dc_name'] = $row['last_dc_name'];
                $list[$i]['ranking_end_score'] = $row['ranking_end_score'];
                $i++;
            }
    
            echo json_encode($list);
        }
        else {
            http_response_code(404);
        }
   
}

?>