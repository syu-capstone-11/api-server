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
    }
}, {
    // 추가 설정 옵션
});

console.log('Post model defined:', Post);

module.exports = Post;