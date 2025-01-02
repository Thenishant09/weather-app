const express = require('express');
const twilio = require('twilio');
require('dotenv').config(); // Ensure to load environment variables from .env
const app = express();
app.use(express.json());

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Get your Twilio Account SID from .env
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Get your Twilio Auth Token from .env
const client = twilio(accountSid, authToken);

// Endpoint to send SMS
app.post('/send-alert', async (req, res) => {
    const { phone, message } = req.body;

    // Validate phone number format (ensure it is 10 digits and optionally includes country code)
    if (!phone || !/^(\+\d{1,3})?\d{10}$/.test(phone)) {
        return res.status(400).json({ success: false, error: 'Invalid phone number' });
    }

    try {
        // Send the SMS using Twilio
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, // Ensure this is set in .env
            to: phone,
        });

        // Respond with success and the message SID
        res.status(200).json({ success: true, sid: response.sid });
    } catch (error) {
        console.error("Twilio error:", error.message); // Log error for debugging
        res.status(500).json({ success: false, error: error.message }); // Send error message
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
