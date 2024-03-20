import User from '../models/userModel.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        const user = await User.findOne({ email });
        if (user) {
            const hashedPassword = user.password;
            const match = await bcrypt.compare(password, hashedPassword);

            if (match) {
                const token = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET_KEY);

                return res.status(200).json({ message: 'login successfull', token });
            }
            else {
                return res.status(401).json({ message: 'wrong email or password' });
            }
        }
        else {
            return res.status(404).json({ message: 'user not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ message: 'please change email. This email already exists.' });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({ name, email, password: hashedPassword, cardsArr: [] });

            const token = jwt.sign({ userId: newUser._id }, process.env.ACCESS_SECRET_KEY);
            return res.status(200).json({ message: 'signup successfull', token });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const getUser = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await User.findById(userId).select('name');
        // const user = await User.findById(userId, 'name');

        return res.status(200).json({ userName: user.name });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const updateUser = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await User.findById(userId);

        if (user) {
            const hashedPassword = user.password;
            const { oldPassword, newPassword, name } = req.body;

            const obj = {};

            if (name.trim().length === 0 && newPassword.trim().length === 0) {
                return res.status(400).json({ message: 'name field is required to update name and newPassword and oldPassword both are required to update password' });
            }

            if (name.trim().length !== 0) {
                obj.name = name.trim();
            }

            if (newPassword.trim().length !== 0) {
                if (oldPassword.trim().length === 0) {
                    return res.status(400).json({ message: 'old password is required to update password' });
                }
                else {
                    const match = await bcrypt.compare(oldPassword, hashedPassword);

                    if (match) {
                        const salt = await bcrypt.genSalt(10);
                        const newHashedPassword = await bcrypt.hash(newPassword, salt);
                        obj.password = newHashedPassword;
                    }
                    else {
                        return res.status(401).json({ message: 'old password is wrong' });
                    }
                }
            }

            await User.findByIdAndUpdate(userId, obj, { new: true });

            return res.status(200).json({ message: 'user updated successfully' });
        }
        else {
            return res.status(404).json({ message: 'user not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}