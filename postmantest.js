const express = require("express");
const Post = require("../express_practice/models/post");
const router = express.Router();

router.post("/post", async (req, res) => {
    const { title, content, coordinate } = req.body;
    if (
        !title || title === "" || !content || content === "" || !coordinate || !coordinate.latitude || !coordinate.longitude
    ){
        res.statusCode = 400;
        res.send({
            message: "잘못된 요청입니다 다시 확인바랍니다",
            code: 400,
            reason: "파라미터가 비어있음",
        });
        return;
    }
    try {
        const created = await Post.create({
            title,
            content,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    
        res.statusCode = 201;
        res.json({
            message: "생성되었습니다.",
            data: created,
        });
    } catch (e) {
        res.statusCode = 500;
        res.json({
            message: "생성에 실패하였습니다",
            reason: e.message,
        });
    } 
});

module.exports = router;

