const { DataTypes } = require('sequelize');
const sequelize = require('../database');

console.log('Defining Post model...');

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    latitude: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    longtitude: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
    
});

console.log('Post model defined:', Post);

module.exports = Post;