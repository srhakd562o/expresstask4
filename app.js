const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const chatRoutes = require('./routes/chatdetail');
const loginRoutes = require('./routes/login');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', loginRoutes);  
app.use('/', chatRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
