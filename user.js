const sendAlert = (weatherDescription) => {
    const phone = phoneInput.value.trim();
    const language = languageSelect.value;
    const message = translations[language] || translations.en;

    if (!phone) {
        alert("Please enter a valid mobile number.");
        return;
    }

    fetch('/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, message: `${message}\nCurrent Weather: ${weatherDescription}` }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Alert sent to ${phone}`);
            } else {
                alert("Failed to send alert. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error sending alert:", error);
            alert("Error sending alert. Please try again later.");
        });
};
