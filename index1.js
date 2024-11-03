import express from 'express';
import cors from 'cors';
import multer from "multer";
import mongoose from 'mongoose';
import intpractice from './public/Schemas/Schemas.js';


const app= express()
app.use(cors())
app.use(express.json())

const mongoDB_URL = "mongodb+srv://user:LhdMs7x0QVWEcMZy@crud.wbcgw.mongodb.net/intpract";

const ConnectDB = async (req, res) => {
  try {
    const connection = await mongoose.connect(mongoDB_URL);
    console.log("MongoDB Connected successfully");
    return connection;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "MongoDB connection Error" });
  }
};
ConnectDB()


const storage =multer.diskStorage({
  destination: function(req,file,cb){
      return cb(null,'./public/Images')
  },
  filename:function(req,file,cb){
      return cb(null,`${Date.now()}_${file.originalname}`)
  }

})

const upload=multer({storage})


app.get('/',(req,res)=>{
    res.send('success')
})

app.post('/update',upload.single('file'),async(req,res)=>{
try {
  console.log(req.body);
  
  const file=new intpractice({file:req.file.path,
    authcode:req.body.authcode
  })
console.log(file);

// const data=await file.save()

  res.status(200).send("sdfghjkl")
} catch (error) {
  
}
})


app.listen(3001,()=>{
    console.log("server is running");
})

