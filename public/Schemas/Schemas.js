import mongoose from "mongoose";

const practice=mongoose.Schema({
    file:String,
    authcode:String
})

const intpractice=mongoose.model('intpractice',practice)
export default intpractice