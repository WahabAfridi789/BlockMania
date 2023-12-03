import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },

    confirmPassword: {
        type: String,
    },

    cnic: {
        type: String,
    },
});

const User = models.User || model("User", userSchema);

export default User;
