import express from 'express';
import cors from 'cors';
import multer from "multer"
import intpractice from './public/Schemas/Schemas.js';
import mongoose from 'mongoose';
import dotenv from'dotenv'

const app= express()
app.use(cors())
app.use(express.json())
app.use('/files',express.static('files'))

const storage =multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,'./public/Images')
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }

})

const upload=multer({storage})


dotenv.config()

// -------------------\

const mongoDB_URL = process.env.mongo_url;

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

// -------------------\



app.post('/update',upload.single('file'),async(req,res)=>{
    
    try {
      
  const file=new intpractice({file:req.file.path,
    authcode:req.body.authcode
  })
console.log(file);

const data=await file.save()

      res.status(200).send(data)
    } catch (error) {
     console.log(error);
      
    }

})

app.get('/get',async(req,res)=>{
    try {
        const getting=await intpractice.find()
        res.status(200).json({getting})
        
    } catch (error) {
        res.status(500).send("error while fetching the data")
    }
})


app.listen(3001,()=>{
    console.log("server is running");
})

