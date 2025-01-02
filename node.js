const express = require('express');
const twilio = require('twilio');
const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Store in environment variables
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post('/send-alert', (req, res) => {
    const { phone, message } = req.body;
    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
        })
        .then(() => res.status(200).send({ success: true }))
        .catch(error => res.status(500).send({ error: error.message }));
});

app.listen(3000, () => console.log("Server running on port 3000"));
