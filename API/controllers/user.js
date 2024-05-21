

import { User } from '../Models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { name, gmail, password } = req.body

    try {
        let user = await User.findOne({ gmail })

        if (user) return res.status(400).json({ message: "User Already exists" });

        const hashPass = await bcrypt.hash(password, 10)

        user = await User.create({ name, gmail, password: hashPass })

        res.status(201).json({ message: "User Registered Successfully!", user })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { gmail, password } = req.body

    try {
        let user = await User.findOne({ gmail });

        if (!user) return res.status(400).json({ message: "User does not exist!" })

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", {
            expiresIn: '1d'
        })

        res.status(200).json({ message: `Welcome ${user.name}`, token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const profile = async (req, res) => {
    res.json({ user: req.user })
}
export const logout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Logout success!');
  };
  
