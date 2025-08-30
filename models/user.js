import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    type : {
        type : String,
        default : "customer"
    },
    profilePicture : {
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_219983&psig=AOvVaw2gJdsL40U2xXCwpxHDqz3_&ust=1756628479670000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJj3sZuNso8DFQAAAAAdAAAAABAO"
    }
})

const User = mongoose.model("users",userSchema)

export default User;