require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/database');
const routes = require('./routes');
const chatSocket = require('./sockets/chatSocket');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.use('/api', routes);

chatSocket(io);

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Error connecting to the database:', err));

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));