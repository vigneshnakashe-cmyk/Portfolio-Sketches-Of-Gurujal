<?php
require_once "auth.php";
$name = htmlspecialchars($_SESSION["user_name"] ?? "User", ENT_QUOTES, "UTF-8");
$email = htmlspecialchars($_SESSION["user_email"] ?? "", ENT_QUOTES, "UTF-8");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Dashboard - Portfolio Sketches</title>
<link rel="stylesheet" href="stylesheet.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<style>
body{
    margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
    background:linear-gradient(135deg,#101820,#24323d,#071b25);
    color:white; font-family:Arial,sans-serif;
}
.dashboard-card{
    width:min(520px,90%); padding:42px; text-align:center; border-radius:25px;
    background:rgba(255,255,255,.08); border:1px solid rgba(0,238,255,.35);
    box-shadow:0 0 35px rgba(0,238,255,.18); backdrop-filter:blur(18px);
}
.avatar{
    width:85px;height:85px;margin:0 auto 18px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    background:linear-gradient(135deg,#00eaff,#ffd700);color:#081b29;
    font-size:34px;font-weight:800;box-shadow:0 0 25px rgba(0,238,255,.7);
}
h1{margin:8px 0;color:#00eaff}
.email{color:#ddd;margin-bottom:28px}
.actions a{
    display:inline-block;margin:7px;padding:12px 24px;border-radius:30px;
    text-decoration:none;color:#081b29;background:#00eaff;font-weight:700;
}
.actions a:last-child{background:#ffd700}
</style>
</head>
<body>
<div class="dashboard-card">
    <div class="avatar"><?= strtoupper(substr($name,0,1)) ?></div>
    <p>Welcome back</p>
    <h1><?= $name ?></h1>
    <div class="email"><?= $email ?></div>
    <div class="actions">
        <a href="index.html"><i class="fa-solid fa-house"></i> Website</a>
        <a href="logout.php"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
    </div>
</div>
</body>
</html>
