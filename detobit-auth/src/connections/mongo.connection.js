const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.connect = async () => {
    await mongoose.connect(process.env.MONGODB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
};

exports.disconnect = async () => {
    await mongoose.disconnect();
};