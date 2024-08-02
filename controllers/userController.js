const UserServices = require("../services/userServices");
const jwt = require("jsonwebtoken"); //

exports.register = async(req, res, ) => {
    try {
        console.log(req.body);
        const {
            email,
            password,
            age,
            gender,
            height,
            weight,
            goal,
            activity,
        } = req.body;

        const duplicateUser = await UserServices.getUserByEmail(email);
        if (duplicateUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // register the user
        const user = await UserServices.registerUser(
            email,
            password,
            age,
            gender,
            height,
            weight,
            goal,
            activity,
        );

        res.json({ status: "Success", message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserServices.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const passwordMatch = await UserServices.comparePassword(password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        //Create a token


        let tokenData = {
            email: user.email,
            userId: user_id,
        }
        const jwtKey = "A123";
        const token = await UserServices.generateToken(tokenData, jwtKey, "24h"); // expiresn in 24 hours

        res.status(200).json({
            status: "Success",
            message: "User logged in successfully",
            token: token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}