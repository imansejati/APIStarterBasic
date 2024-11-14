const User = require('../models/userModel');
const render = require('../utils/render');

const homeController = {
    index: (req, res) => {
        const users = User.getAllUsers();
        render(res, 'home.html', {
            users
        });
    }
};

module.exports = homeController;