const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { connectCassandra } = require('./config/cassandra');
const webhookRoute = require('./routes/webhook');

const app = express();
dotenv.config();
connectCassandra();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', webhookRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
