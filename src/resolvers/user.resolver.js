const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const userResolvers = {
    Query: {
        users: () => User.findAll()
    },
    Mutation: {
        register: async (_, { username, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ username, password: hashedPassword });
            return "User created successfully";
        },
        login: async (_, { username, password }) => {
            const user = await User.findOne({ where: { username } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        }
    }
};

module.exports = userResolvers;
