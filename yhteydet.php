<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "laiterekisteri";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO asiakas (AVAIN, NIMI, SPOSTI, PUHNRO, TUNNUS, SALASANA)
VALUES ('John', 'Doe', 'john@example.com')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>