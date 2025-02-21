<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    $to = 'ilya.molokob@gmail.com';
    $subject = 'Новое сообщение с контактной формы';
    $body = "Имя: $name
Email: $email
Сообщение:\n$message";

    $headers = "From: $email\r
";
    $headers .= "Reply-To: $email\r
";
    $headers .= "MIME-Version: 1.0\r
";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r
";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Ошибка отправки письма.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Некорректный запрос.']);
}