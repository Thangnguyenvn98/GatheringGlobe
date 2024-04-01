import mongoose from "mongoose";

export type UserType = {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}; 

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unqiue: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

const User = mongoose.model<UserType>("User", userSchema);

export default User