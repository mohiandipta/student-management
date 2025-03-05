const bcrypt = require('bcrypt');
const User = require('../models/user.model');
require('dotenv').config();

const userResolvers = {
    Query: {
        users: async (_, { limit = 10, offset = 0 }) => 
            await User.findAll({ limit, offset })
    },
    Mutation: {        
        updateUser: async (_, { id, username, email, password }) => {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }

            if (username) user.username = username;
            if (email) user.email = email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }

            await user.save();
            return user;
        },

        deleteUser: async (_, { id }) => {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }

            await user.destroy();
            return "User deleted successfully";
        }
    }
};

module.exports = userResolvers;
