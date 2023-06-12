<?php
// Include the necessary files and establish a database connection
require_once 'config.php';

// Retrieve the request data
$data = json_decode(file_get_contents("php://input"), true);

// Perform data validation and sanitization

// Check if the required fields are valid
if (isset($data['order_id']) && isset($data['buyer_id']) && isset($data['seller_id']) && isset($data['offer_amount'])) {
    $order_id = $data['order_id'];
    $buyer_id = $data['buyer_id'];
    $seller_id = $data['seller_id'];
    $offer_amount = $data['offer_amount'];

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



    ////
    // Check if the seller has already made an offer for the given order
    $stmt = $pdo->prepare("SELECT * FROM offers WHERE order_id = ? AND seller_id = ?");
    $stmt->execute([$order_id, $seller_id]);
    $existing_offer = $stmt->fetch();

    if ($existing_offer) {
        // Update the existing offer with the new offer amount
        $stmt = $pdo->prepare("UPDATE offers SET offer_amount = ? WHERE order_id = ? AND seller_id = ?");
        $stmt->execute([$offer_amount, $order_id, $seller_id]);

        // Offer updated successfully
        $response = [
            'message' => 'Offer updated successfully.'
        ];
    } else {
        // Insert a new row in the "offers" table with the offer details
        $stmt = $pdo->prepare("INSERT INTO offers (order_id, buyer_id, seller_id, offer_amount) VALUES (?, ?, ?, ?)");
        $stmt->execute([$order_id, $buyer_id, $seller_id, $offer_amount]);

        // Offer created successfully
        $response = [
            'message' => 'Offer created successfully.'
        ];
    }


// Set the appropriate headers and encode the response data as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
