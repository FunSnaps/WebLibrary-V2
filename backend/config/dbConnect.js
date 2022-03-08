const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect( process.env.MONGODB_URL2,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
    });
};

module.exports = dbConnect;