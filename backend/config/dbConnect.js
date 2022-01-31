const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb+srv://FunSnaps:vBER07Z7I6ApEhCB@weblibrary-v2.cgvf3.mongodb.net/WebLibrary-V2?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to MongoDB!!!')
    });
};

module.exports = dbConnect;