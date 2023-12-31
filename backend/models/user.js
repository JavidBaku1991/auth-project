import mongoose, { mongo } from "mongoose";



const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_3177440&psig=AOvVaw1GmkIIoCj3KdSf8vzpkGpQ&ust=1703760584078000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLi07ri5r4MDFQAAAAAdAAAAABAU",
    }
},
{timestamps:true}
)


const User=mongoose.model("User",userSchema);


export default User;