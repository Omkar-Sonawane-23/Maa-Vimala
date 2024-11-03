<?php
// Database connection parameters
$servername = "127.0.0.1";
$db_username = "root";
$db_password = "";
$dbname = "rospl";


// Create a connection to the database
$conn = new mysqli($servername, $db_username, $db_password, $dbname);


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Query to fetch feedback
$sql = "SELECT name, email, phone, feedback_text, created_at FROM feedback ORDER BY created_at DESC";
$result = $conn->query($sql);


$feedbacks = [];


if ($result->num_rows > 0) {
    // Fetch all feedback
    while ($row = $result->fetch_assoc()) {
        $feedbacks[] = $row;
    }
}


// Close the database connection
$conn->close();


// Return feedback data as JSON
header('Content-Type: application/json');
echo json_encode($feedbacks);
?>
