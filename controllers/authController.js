const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

module.exports = {
    async register(req, res) {
        try {
            const { login, password } = req.body;

            const existingUser = await User.findOne({ where: { login }});
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ login, password: hashedPassword })
            const token = jwt.sign({ id: user.id, login: user.login }, secretKey, { expiresIn: '1h'});

            res.status(201).json({
                message: 'User registered successfully',
                token,
            });
        } catch (error) {
            res.status(500).json({ message: 'Registration error', error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { login, password } = req.body;

            const user = await User.findOne({ where: { login }});
            if (!user) {
                return res.status(400).json({ message: 'Invalid login or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid login or password' });
            }
            
            const token = jwt.sign({ id: user.id, login: user.login}, secretKey, { expiresIn: '1h' });

            res.json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Login error', error: error.message });
        }
    },
    
    async deleteUser(req, res) {
        const { id } = req.params
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(204).send(); 
    },
};
