const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const socketServer = require('./socketServer');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// register the routes
app.use('/api/auth', authRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Database connection failed. Server not started');
    });