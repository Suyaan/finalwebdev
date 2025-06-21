<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'seanmiranda513@gmail.com';         
        $mail->Password   = 'xsecsnbktnqcakmw';          
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('seanmiranda513@gmail.com', 'Pizza House Website');
        $mail->addAddress('seanmiranda513@gmail.com');          

        // Email content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission from $firstname";
        $mail->Body    = "
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> $firstname $lastname</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();

        echo "<script>alert('Message sent successfully!'); window.location.href='http://localhost/piza/main.html#contact';</script>";
    } catch (Exception $e) {
        echo "<pre>";
        echo "Message could not be sent.<br>";
        echo "Mailer Error: " . $mail->ErrorInfo;
        echo "</pre>";
    }
}
?>
