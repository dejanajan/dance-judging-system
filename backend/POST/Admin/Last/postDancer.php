<?php

    include_once("../../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $gentleman_name = trim($request->gentleman_name);
        $gentleman_surname = trim($request->gentleman_surname);
        $lady_name = trim($request->lady_name);
        $lady_surname = trim($request->lady_surname);
        $dance_club = trim($request->dance_club);
        $age_group = (int)trim($request->age_group);
        
        $sql = "INSERT INTO `dancer` (`dancer_name`, `dancer_surname`, `dance_club`, `age_group`) VALUES ('{$gentleman_name}', '{$gentleman_surname}', '{$dance_club}', '{$age_group}'), ('{$lady_name}', '{$lady_surname}', '{$dance_club}', '{$age_group}')";

        if (mysqli_query($con, $sql))
        {
            http_response_code(201);
            $authdata = [
                'dancer_name' => $gentleman_name,
                'dancer_surname' => $gentleman_surname,
                'dance_club' => $dance_club,
                'age_group' => $age_group,
                'dancer_name' => $lady_name,
                'dancer_surname' => $lady_surname,
                'dance_club' => $dance_club,
                'age_group' => $age_group,
            ];

            echo json_encode($authdata);
        } else {
            http_response_code(422);
        }
    }

?>