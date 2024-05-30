const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Post = require('../models/post');

router.post('/', async (req, res) => {
    const { page = 1, per_page = 10, search = '' } = req.body;
    
    const limit = parseInt(per_page);
    const offset = (page - 1) * limit;

    const where = search ? {
        [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { content: { [Op.like]: `%${search}%` } }
        ]
    } : {};

    try {
        const { count, rows } = await Post.findAndCountAll({
            where,
            limit,
            offset
        });

        res.json({
            total: count,
            pages: Math.ceil(count / limit),
            page,
            per_page: limit,
            posts: rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;