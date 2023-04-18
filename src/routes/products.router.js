import { Router } from 'express';

const router = Router();

const productManager = new productManager();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts();
    res.send(products)
})

export default router;