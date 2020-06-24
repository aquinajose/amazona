import express from 'express';
import Product from '../models/productModel';
import { getToken,isAdmin,isAuth } from '../util';

const router = express.Router();

router.put('/:id',isAuth,isAdmin, async (req, res) => {
    try{
    const productId = req.params.id;
     const product = await Product.findOne({_id:productId})
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category;
        product.image = req.body.image;
        product.description = req.body.description;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(201).send({ message: 'Updated product', data: updatedProduct })
        }
        return res.status(500).send({ message: 'Error in updating product' })
    }
    }catch(err){
        res.send(err)
    }
})
router.post('/',isAuth, isAdmin,async (req, res) => {
    try{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
        brand: req.body.brand,
        countInStock: req.body.countInStock
    })
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New product created', data: newProduct })
    }
    return res.status(500).send({ message: 'Error in creating product' })
    }catch(err){
        res.send(err)
    }
})
router.delete('/:id',isAuth,isAdmin,async (req,res)=>{
    try{
        const productId = req.params.id;
        const product = await Product.findByIdAndRemove(productId);
        res.send(product)    
    }catch(err){
        res.send(err)
    }
})
router.get('/', async (req, res) => {

    const products = await Product.find({});
    res.send(products)
})
export default router;