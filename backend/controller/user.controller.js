import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const userRegistration = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await userModel.findOne({ email })
		if (user) {
			return res.status(400).json({ message: "User already exists", success: false })
		}

		const passwordHash = await bcrypt.hash(password, 10)

		const newUser = new userModel({
			name,
			email,
			password: passwordHash
		})
		await newUser.save()

		return res.status(201).json({
			message: "User registered successfully",
			success: true
		})
	} catch (error) {
		return res.status(500).json({
			message: "Error registering user",
			error,
			success: false
		})
	}
}


// user Login

const userLogin = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await userModel.findOne({ email });

		if (!user) {
			return res.status(409).json({
				message: "User not found",
				success: false
			})
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res.status(401).json({
				message: "Wrong password",
				success: false
			})
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		});

		return res.status(200).json({
			message: "Login Success",
			success: true,
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email
			}
		})
	} catch (error) {
		return res.status(500).json({
			message: error,
			success: false
		})
	}
}

export { userRegistration, userLogin }
