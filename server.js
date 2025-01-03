const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const app = express();

// Enable CORS for all origins (you can restrict it to your frontend origin if needed)
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// NodeMailer setup for email transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail as the email service (can be changed)
    auth: {
        user: process.env.EMAIL_USER, // Your email address (use .env for security)
        pass: process.env.EMAIL_PASS, // Your email password (use .env for security)
    },
});

// Endpoint to send email
app.post('/send-alert', async (req, res) => {
    const { email, message } = req.body;

    // Validate email format
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    try {
        // Send email using NodeMailer
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: email,                   // Receiver address
            subject: 'Weather Alert Notification',  // Subject of the email
            text: message,               // Body of the email
        };

        const info = await transporter.sendMail(mailOptions);

        // Respond with success and email info
        res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error("NodeMailer error:", error.message); // Log error for debugging
        res.status(500).json({ success: false, error: error.message }); // Send error message
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
