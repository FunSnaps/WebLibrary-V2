const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect( process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to MongoDB!!!')
    });
};

module.exports = dbConnect;