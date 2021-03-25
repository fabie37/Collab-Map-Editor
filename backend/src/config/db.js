const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
    const conn = await mongoose
        .connect(process.env.MONGO_DB_CONNECTION, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        .catch((error) => {
            console.log(error);
        });

    console.log(`MongoDB Connected... ${conn.connection.host}`);
};

module.exports = connectDB;
