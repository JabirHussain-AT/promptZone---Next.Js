import { Schema , model , models } from "mongoose";

const userSchema = new Schema({
    email : {
        type : String ,
        unique : [ true , 'Email already exists'] ,
        required : [ true , 'Email is Required !']
    },
    userName : {
        type : String,
        required :  [ true , 'UserName is requried ! '] ,
        match : [
            /^(?=.{8,20}$)(?!.*[_.]{2})(?![_.])[a-zA-Z0-9._]+(?<![_.])$/, 
            "Username invalid, it should contain 8-20 alphanumeric characters, may include underscores and periods, but should not start or end with them, and should not contain consecutive underscores or periods!"
        ]
    },
    image : {
        type : String
    }
})

const User = models.User ||  model("User",userSchema);

export default User;