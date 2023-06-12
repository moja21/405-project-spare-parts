<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Rest of your PHP code


// Check if the request method is not POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // Invalid request method
    $response = [
        'error' => 'Invalid request method (405). Only POST requests are allowed.'
    ];

    // Set the appropriate headers and encode the response data as JSON
    header('Content-Type: application/json');
    echo json_encode($response);

    // Terminate the script execution
    die();
}

$host = 'eu-cdbr-west-03.cleardb.net';
$dbName = 'heroku_81ec8468be33dd3';
$username = 'b546ff65a6a1d5';
$password = '8fc53019';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check the connection status
    $connectionStatus = $pdo->getAttribute(PDO::ATTR_CONNECTION_STATUS);

    if ($connectionStatus === false) {
        // Connection failed
        //echo json_encode(array("info" => "Database connection failed."));
    } else {
        // Connection successful
        //echo json_encode(array("info" => "Database connection successful."));
    }
} catch (PDOException $e) {
    // Connection error
    echo json_encode("Database connection error: " . $e->getMessage());
}


?>
