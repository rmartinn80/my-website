<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "info@piecesensolde.ca"; // Replace with your email
    $subject = "Message from $name via Contact Form";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8";

    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès!";
    } else {
        echo "Une erreur est survenue. Veuillez réessayer.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>