const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res, next) => {
    const username = req.query.username || 'Guest';
    let messages = [];

    try {
        messages = fs.readFileSync('messages.txt', 'utf8').split('\n').filter(msg => msg.trim() !== '');
    } catch (error) {
        console.error("Error while reading messages", error);
    }

    const previousMessagesHTML = messages.map(msg => `<div>${msg.trim()}</div>`).join('');

    res.send(`
        <script>
            localStorage.setItem('username', '${username}');
        </script>
        <h1>Welcome ${username}</h1>
        <div id="messages">
            ${previousMessagesHTML}
        </div>
        <form action="/send-message?username=${encodeURIComponent(username)}" method="POST">
            <label>Message:</label>
            <input type="text" name="message">
            <button type="submit">Send</button>
        </form>
    `);
});

router.post('/send-message', (req, res, next) => {
    const username = req.query.username || 'Guest';
    const message = req.body.message;

    if (!message) {
        res.status(400).send('<h1>Please enter a message to send</h1>');
        return;
    }

    const data = `${username} : ${message}\n`;

    fs.appendFile('messages.txt', data, (err) => {
        if (err) {
            console.error('Error while saving message:', err);
            res.status(500).send('<h1>Error Saving message</h1>');
        } else {
            res.redirect(`/?username=${encodeURIComponent(username)}`);
        }
    });
});

module.exports = router;
