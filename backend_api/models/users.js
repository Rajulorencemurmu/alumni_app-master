const  mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type :String ,required:true,unique:true},
    password: { type: String, required: true },
    number: { type: String, unique: true,required: true },

    // profileImage: { data: Buffer, contentType: String },
    // dateCreated: { type: Date, default: Date.now() }

    image:{
        type:String, 
        required:true,
    },
    
    friendRequests:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        },
    ],
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
],
    sentFriendRequests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }]
})

const User=mongoose.model("User",userSchema)
module.exports=User


