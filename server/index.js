const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const campaignRoutes = require('./routes/campaignRoutes');
const publisherRoutes = require('./routes/publisherRoutes');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/qurilo')
    .then(() => {
        console.log('DB Connected');
    })
    .catch((error) => {
        console.log(`${error} connecting Database.`);
    });

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Node.JS and Express.JS app.');
});

app.get('/api', (req, res) => {
    res.status(200).send('API is working....');
});

app.use('/api/ads', campaignRoutes);
app.use('/api/publisher', publisherRoutes);


app.use('/uploads/campaign/images/', express.static(__dirname + "/uploads/campaign/images/"))

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});