<?php
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

// Check if the required fields are valid
if (isset($data['order_id']) && isset($data['new_status'])) {
    $orderID = $data['order_id'];
    $newStatus = $data['new_status'];

    // Check if the new status is one of the accepted values
    $acceptedStatuses = ['active', 'expired', 'closed', 'canceled', 'on_hold'];
    if (!in_array($newStatus, $acceptedStatuses)) {
        $response = [
            'message' => 'Invalid request. Invalid status value.'
        ];

        // Set the appropriate headers and encode the response data as JSON
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
} else {
    // Invalid request, missing required fields
    $response = [
        'message' => 'Invalid request. Required fields are missing.'
    ];

    // Set the appropriate headers and encode the response data as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Check if the new status is different from the current status in the database
$stmt = $pdo->prepare("SELECT status FROM orders WHERE id = ?");
$stmt->execute([$orderID]);
$currentStatus = $stmt->fetchColumn();

if ($currentStatus === $newStatus) {
    $response = [
        'message' => 'The order is already ("' . $newStatus . '").'
    ];

    // Set the appropriate headers and encode the response data as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Update the status of the order in the database
$stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
$stmt->execute([$newStatus, $orderID]);

// Check if the update was successful
if ($stmt->rowCount() > 0) {
    // The update was successful
    $response = [
        'message' => 'Order status updated successfully.'
    ];
} else {
    // The update failed
    $response = [
        'message' => 'Failed to update order status.'
    ];
}

// Set the appropriate headers and encode the response data as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
