const express = require('express');
const router = express.Router();

router.get('/loginP', (req, res, next) => {
    res.send(`
        <form action="/login/user" method="POST">
            <label>Enter your Username: </label>
            <input type="text" name="username">
            <button type="submit">Login</button>
        </form>
    `);
});

router.post('/user', (req, res, next) => {
    const username = req.body.username;
    if (username) {
        res.redirect(`/?username=${encodeURIComponent(username)}`);
    } else {
        res.send('<h1>Please enter a Username</h1>');
    }
});

module.exports = router;
