import sequelize = require("../config/database")

const seedDatabase = async () => {
    try {
        await sequelize.query('DELETE FROM Users;');
        await sequelize.query('DELETE FROM chatRooms;');
        await sequelize.query('DELETE FROM messages;');

        await sequelize.sync({ force: true });

        // Insert Users
        await sequelize.query(`
            INSERT INTO users (username, email, password) VALUES 
            ('Alice', 'alice@example.com', 'password'), 
            ('Bob', 'bob@example.com', 'password'),
            ('John', 'john@example.com', 'password'),
            ('Jane', 'jane@example.com', 'password');
        `);

        // Insert Chat Rooms
        await sequelize.query(`
            INSERT INTO chatRooms (name) VALUES 
            ('General'), 
            ('Friend'), 
            ('Work'), 
            ('Random');
        `);

        // Insert Messages
        await sequelize.query(`
            INSERT INTO messages (content, userId, roomId) VALUES 
            ('Hello there!', 1, 1), 
            ('Catch you later!', 2, 2),
            ('Deadline tomorrow', 2, 3);
        `);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();