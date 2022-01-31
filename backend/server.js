const express = require('express');
const mongoose = require('mongoose')
const dbConnect = require('./config/dbConnect');

const app = express();
dbConnect();
const PORT = process.env.PORT || 5000;

//Login
app.post('/api/users/login', (req, res) => {
    res.send('Login route');
});

//Register
app.post('/api/users/register', (req, res) => {
    res.send('Registration route');
});

//Update
app.put('/api/users/update', (req, res) => {
    res.send('Update route');
});

//Delete
app.delete('/api/users/:id', (req, res) => {
    res.send('Delete route');
});

//Fetch
app.get('/api/users', (req, res) => {
    res.send('Fetch route');
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});

/*
FunSnaps
vBER07Z7I6ApEhCB
*/
