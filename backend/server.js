const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT  || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});

app.use(bodyParser.json());

const exercisesRouter = require('./routes/exercises.js');
const usersRouter = require('./routes/users.js');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () =>{
    console.log(`Server is running on the port: ${port}` );
})