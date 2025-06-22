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
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'seanmiranda513@gmail.com';         
        $mail->Password   = 'xsecsnbktnqcakmw';          
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('seanmiranda513@gmail.com', 'Pizza House Website');
        $mail->addAddress('seanmiranda513@gmail.com');

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission from $firstname";

        $mail->Body = "
            <div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>
                <h2 style='color: #d32f2f;'>📬 New Contact Form Submission</h2>
                <p><strong>Submitted on:</strong> " . date('F j, Y, g:i a') . "</p>
                <hr style='border: none; border-top: 1px solid #ccc;'>

                <h3 style='margin-bottom: 5px;'>👤 Contact Details</h3>
                <p><strong>Name:</strong> $firstname $lastname</p>
                <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
                <p><strong>Phone:</strong> $phone</p>

                <h3 style='margin-bottom: 5px;'>💬 Message</h3>
                <div style='background-color: #f9f9f9; padding: 10px; border-left: 4px solid #4caf50;'>
                    <p style='margin: 0;'>$message</p>
                </div>

                <hr style='border: none; border-top: 1px solid #ccc; margin-top: 30px;'>
                <p style='font-size: 12px; color: #777;'>This message was sent from the contact form on the Pizza House website.</p>
            </div>
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
