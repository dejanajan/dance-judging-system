<?php 
    include_once("../../../backend/database.php");
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $username = trim($request->username);
        $password = trim($request->password);
        $name = trim($request->name);
        $surname = trim($request->surname);
        $dance_studio = trim($request->dance_studio);
        $country = trim($request->country);
        $flag_adjucator = (int)$request->flag_adjucator;
        $flag_dance_category = (int)$request->flag_dance_category;


        $sql = "INSERT INTO `users` (`username`, `password`, `name`, `surname`, `dance_studio`, `country`, `flag_adjucator`, `flag_dance_category`) VALUES ('{$username}', '{$password}', '{$name}', '{$surname}', '{$dance_studio}', '{$country}', '{$flag_adjucator}', '{$flag_dance_category}')";

        if (mysqli_query($con, $sql))
        {
            http_response_code(201);
            $authdata = [
                'username' => $username,
                'password' => $password,
                'name' => $name,
                'surname' => $surname,
                'dance_studio' => $dance_studio,
                'country' => $country,
                'flag_adjucator' => $flag_adjucator,
                'flag_dance_category' => $flag_dance_category,
            ];

            echo json_encode($authdata);
        } else {
            http_response_code(422);
        }
    }

?>