import db from '../models';
import { sequelize, User, ChatRoom, Message } from '../models';

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const users = await User.bulkCreate([
            { username: 'Alice', email: 'alice@example.com', password: 'password' },
            { username: 'Bob', email: 'bob@example.com', password: 'password' },
            { username: 'John', email: 'john@example.com', password: 'password' },
            { username: 'Jane', email: 'jane@example.com', password: 'password' },
        ]);

        const chatRooms = await ChatRoom.bulkCreate([
            { name: 'General' },
            { name: 'Friend' },
            { name: 'Work' },
            { name: 'Random' },
        ]);

        const messages = await Message.bulkCreate([
            { content: 'Hello there!', userId: users[0].id, roomId: chatRooms[0].id },
            { content: 'Catch you later!', userId: users[1].id, roomId: chatRooms[1].id },
            { content: 'Deadline tomorrow', userId: users[1].id, roomId: chatRooms[2].id },
        ]);

        console.log('Database seeded successfully!');
    }

    catch (error) {
        console.error('Error seeding the database:', error);
    }
    finally {
        await sequelize.close();
    }
};

seedDatabase();