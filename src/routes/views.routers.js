import { Router } from 'express';

const router = Router();

const ProductManager = new productManager();

router.get('/', async (req,res)=>{
    const products = await ProductManager.getProducts();
    res.send(products)
})

export default router;