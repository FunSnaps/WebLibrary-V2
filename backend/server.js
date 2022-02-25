const express = require('express');
const dotenv = require('dotenv');
const error = require('./middlewares/errorMiddlewareHandler');
const usersRoute = require('./routes/usersRoute');
const booksRouter = require('./routes/booksRoute');
dotenv.config();
const dbConnect = require('./config/dbConnect');

const app = express();
dbConnect();
const PORT = process.env.PORT || 5000;

//Middleware (data body)
app.use(express.json());

//Error middleware
app.use(error?.errorMiddlewareHandler);

//Routes
app.use('/api/users', usersRoute);
app.use('/api/books', booksRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});

/*
FunSnaps
vBER07Z7I6ApEhCB
*/
