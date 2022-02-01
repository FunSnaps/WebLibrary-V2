const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/usersRoute');
const dbConnect = require('./config/dbConnect');

const app = express();
dbConnect();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());

//Routes
app.use('/api/users', usersRoute);


app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});

/*
FunSnaps
vBER07Z7I6ApEhCB
*/
