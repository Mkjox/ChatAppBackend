module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log('User joined room ${roomId}');
        });

        socket.on('chatMessage', (messageData) => {
            io.to(messageData.roomId).emit('message', messageData);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};