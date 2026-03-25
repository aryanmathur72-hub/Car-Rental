import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {
        type: String,
        required: function requiredPassword() {
            return this.authProvider === 'local';
        }
    },
    authProvider: {type: String, enum: ['local', 'google'], default: 'local'},
    googleId: {type: String, unique: true, sparse: true},
    role: {type: String, enum: ["owner", "user"], default:'user'},
    image: {type:String, default:''},
},{timestamps: true
    
})

const User = mongoose.model('User', userSchema)

export default User;