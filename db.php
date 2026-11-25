
<?php
// InfinityFree MySQL Configuration

$host = "sql206.infinityfree.com";
$port = 3306;
$dbname = "if0_43131196_sketches_db";
$username = "if0_43131196";
$password = "o9G2cJM2LPcW";

$conn = new mysqli(
    $host,
    $username,
    $password,
    $dbname,
    $port
);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
