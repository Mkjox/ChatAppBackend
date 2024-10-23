'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdir(__dirname, (err, files) => {
  if(err) {
    console.error('Error reading directory:', err);
    return;
  }


  files
  .filter((file) => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  );
})
 .forEach((file) => {
  const model = require(path.join(__dirname, file));
  db[model.name] = model;
  });
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// const User = require('./user');
// const ChatRoom = require('./chatRoom');
// const Message = require('./message');

// db.User = User;
// db.ChatRoom = ChatRoom;
// db.Message = Message;

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

module.exports.User = db.User;
module.exports.ChatRoom = db.ChatRoom;
module.exports.Message = db.Message;
