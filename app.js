const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors'); // Import cors
const dotenv = require('dotenv');
const userRoutes = require('./api/crud-user');
const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@abriendocaminos.3lpl0.mongodb.net/${process.env.DB_NAME}`;

mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("DB Connected");
});

app.use('/', userRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

