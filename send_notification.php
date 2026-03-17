<?php

$TARGET_EMAIL = 'megoferas2@icloud.com';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

$email = isset($data['email']) ? trim($data['email']) : '';

if ($email === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

$subject = 'New Otires Launch Notification Signup';
$timestamp = date('Y-m-d H:i:s T');
$body = "New launch notification signup from the Otires landing page.\n\n";
$body .= "Email: " . $email . "\n";
$body .= "Submitted at: " . $timestamp . "\n";

$headers = [
    'From: ' . $TARGET_EMAIL,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($TARGET_EMAIL, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thank you. You will be notified when we launch.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to send notification. Please try again later.']);
}
