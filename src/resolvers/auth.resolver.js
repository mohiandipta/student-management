const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const SECRET_KEY = "your_secret_key"; // Store in environment variables

const authResolver = {
    Mutation: {
        register: async (_, { username, email, password }) => {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) throw new Error("Email already exists");

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });

            return user;
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ where: { email } });
            if (!user) throw new Error("User not found");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

            return { token, user };
        }
    }
};

module.exports = authResolver;
