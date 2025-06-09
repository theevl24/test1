const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');
const postRouter = require('./postRoutes');

router.use('/user', userRouter);
router.use('/post', postRouter);

module.exports = router;