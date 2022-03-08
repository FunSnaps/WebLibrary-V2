const express = require('express');
const dotenv = require('dotenv');
const error = require('./middlewares/errorMiddlewareHandler');
const auth = require('./middlewares/authMiddleware');
const usersRoute = require('./routes/usersRoute');
const booksRoute = require('./routes/booksRoute');

dotenv.config();
const dbConnect = require('./config/dbConnect');

const app = express();
dbConnect();
const PORT = process.env.PORT || 5000;

//Middleware (data body)
app.use(express.json());

//Error middleware
app.use(error?.errorMiddlewareHandler);

if (!process.env.NODE_TEST) {
    app.use(auth?.authMiddleware);
}

//Routes
app.use('/api/users', usersRoute);
app.use('/api/books', booksRoute);

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});

module.exports = app;

/*
FunSnaps
vBER07Z7I6ApEhCB
*/
