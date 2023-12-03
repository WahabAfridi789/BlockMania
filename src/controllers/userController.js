const User = require("../../model/userModel");

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, cnic } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "Email is already registered" });
        }

        // Create a new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            cnic,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
