
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../lib/utils/generateToken.js';

export const signup = async (req, res) => {
    try {
    const { fullName, userName, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const [existingUser, existingEmail] = await Promise.all([
      User.findOne({ username: userName }),
      User.findOne({ email })
    ]);

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullName,
      username: userName,
      email,
      password: hashedPassword,
      profileImg: "defaultProfileImg.png",
      coverImg: "defaultCoverImg.png",
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    });
  } catch (err) {
    console.error("Error in signup controller:", err.message);
    res.status(500).json({ error: "Internal server error" });
}
};

export const login = (req, res) => {
    res.json({ hi: 'hello' })
}

export const logout = (req, res) => {
    res.json({ hi: 'hello' })
}