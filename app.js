const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());


//Реалізація routes, щоб забезпечити місцеположення файлів js
const productRoutes = require('./routes/productRoutes');

const PORT = process.env.PORT || 4000;


async function connectToDatabase(){
    try {
        const connection = await mongoose.connect(process.env.URL_DB);
        console.log("Database MongoDB connect successful");
        return connection;
    } catch (err) {
        console.log(`Something wrong with MongoDB ${err}`);
        return null;
    }
}

        async function startServer() {
            try {
                const connection = await connectToDatabase();
                if (!connection) {
                    console.log("Unable to connect to MongoDB. Exiting...");
                    process.exit(1);
                }
                await app.listen(PORT);
                console.log(`Server has been started ${PORT}`);
            } catch (err) {
                console.log(`Error starting server: ${err}`);
                process.exit(1);
            }
        }


//Routes
app.use('/', productRoutes);

startServer();

module.exports = {app, startServer};