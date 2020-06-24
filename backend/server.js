import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import data from './data';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute.js';


dotenv.config();

const mongodbUrl= config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).catch(error=>console.log(error.reason))

const app= express();
app.use(bodyParser.json())
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
// app.get('/api/products',(req,res)=>{
//     res.send(data.products)
// })
// app.get('/api/products/:id',(req,res)=>{
//     const product = data.products.find(product=>product._id===req.params.id)
//     if(product){
//         res.send(product)
//     }
//     else{
//         res.status(404).send({msg:'Product not found.'})
//     }
// })
app.listen(5000,()=>{
    console.log('App started running in port 5000')
});

