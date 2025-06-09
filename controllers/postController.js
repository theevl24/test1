const product = require('../../shop/models/product');
const { Post } = require('../models');

module.exports = {
    async getAllPosts(req, res) {
        const posts = await Post.findAll();
        res.json(posts);
    },

    async getPostById(req, res) {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', error: error.message });
        }
    },

    async addPost(req, res) {
        const { title, text } = req.body;
        const post = await Post.create({ title, text });
        res.status(201).json(post);
    },

    async changePost(req, res) {
        const { id } = req.params;
        const { title, text } = req.body;
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = title;
        post.text = text;
        await post.save();
        res.json(post);
    },

    async deletePost(req, res) {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.destroy();
        res.status(204).send();
    },
};