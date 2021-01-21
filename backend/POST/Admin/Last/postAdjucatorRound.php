<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $competition_adjucator_sign = (int)trim($request->competition_adjucator_sign);
        $competition_adj_component = (int)trim($request->competition_adj_component);
        $competition_adjucator_id = (int)trim($request->competition_adjucator_id);


    $sql = "INSERT INTO `adjucator_round` (`competition_event`, `round_id`, `competition_adjucator_id`, `competition_adjucator_sign`, `competition_adj_component`) VALUES ((SELECT competition_event FROM competition ORDER BY competition_id DESC LIMIT 1), (SELECT competition_num_round FROM round ORDER BY round_id DESC LIMIT 1), '{$competition_adjucator_id}', '{$competition_adjucator_sign}', '{$competition_adj_component}')";

    if (mysqli_query($con, $sql))
        {
            http_response_code(201);
        } else {
            http_response_code(422);
        }

    }

?>