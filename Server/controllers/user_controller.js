const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    return token;
};

const register = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const user = new User({ name, username, email, password });
        await user.save();
        const token = await generateAuthToken(user);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const token = await generateAuthToken(user);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

const getUserProfile = async (req, res) => {
    res.send(req.user);
};

const updateUserDetails = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'username', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
};

const uploadProfilePicture = async (req, res) => {
    // Handle profile picture upload logic here
    res.send();
};

module.exports = {
    register,
    login,
    getUserProfile,
    updateUserDetails,
    uploadProfilePicture,
};
