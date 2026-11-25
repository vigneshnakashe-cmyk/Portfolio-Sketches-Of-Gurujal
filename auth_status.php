<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");

if (!empty($_SESSION["user_id"])) {
    echo json_encode([
        "loggedIn" => true,
        "user" => [
            "id" => (int)$_SESSION["user_id"],
            "name" => $_SESSION["user_name"] ?? "",
            "email" => $_SESSION["user_email"] ?? ""
        ]
    ]);
} else {
    echo json_encode([
        "loggedIn" => false,
        "user" => null
    ]);
}
?>
