const mongoose = require('mongoose');

let connection = null;

exports.connect = async () => {
    if (connection == null) {
        console.log("novaa")
        connection = await mongoose.connect(process.env.MONGODB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            socketTimeoutMS: 2000000,
            keepAlive: true
        });
    }else
    {
        console.log("velhaa")
    }
};