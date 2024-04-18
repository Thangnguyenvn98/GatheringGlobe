import mongoose from "mongoose";
import bcrypt from "bcryptjs"

export type UserType = {
    _id: string,
    username:string,
    email: string,
    password: string,
    
}; 

const userSchema = new mongoose.Schema({
    username: { type:String , required: true, unique:true},
    email: {type: String, required: true, unqiue: true},
    password: {type: String, required: true},
});

// Middleware for mongodb
userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User