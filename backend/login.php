<?php
    include_once("database.php");
    $postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    $users = [];
    $password = mysqli_real_escape_string($con, trim($request->password));
    $username = mysqli_real_escape_string($con, trim($request->username));

    $sql = "SELECT user_id, username, password, name, surname, flag_adjucator, dance_studio, country, flag_dance_category FROM users WHERE `username`='{$username}' and `password`='{$password}'";

    if($result = mysqli_query($con, $sql))
    {
        http_response_code(201);
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $users[$i]['user_id'] = $row['user_id'];
            $users[$i]['name'] = $row['name'];
            $users[$i]['username'] = $row['username'];
            $users[$i]['password'] = $row['password'];
            $users[$i]['surname'] = $row['surname'];
            $users[$i]['country'] = $row['country'];
            $users[$i]['dance_studio'] = $row['dance_studio'];
            $users[$i]['flag_adjucator'] = $row['flag_adjucator'];
            $users[$i]['flag_dance_category'] = $row['flag_dance_category'];
            $i++;
        }

        echo json_encode($users);
    } else {
        http_response_code(404);
    }
}
?>