import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/views.routers.js'
import __dirname from './utils.js';
import viewRouter from './routes/views.routers.js';
import productManager from './managers/productManager.js';
import * as url from 'url';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const PORT = 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
})



app.engine('handlebars', handlebars.engine());
app.set('views', dirname+ '/views');
app.set('view engine', 'handlebars');

app.use('/',viewRouter);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use('/realTimeProducts', viewRouter)
app.use('/api/products',productsRouter)


const io = new Server(server)
const product = new productManager($`{dirname}/files/db.json`)


io.on('connection', async Socket=>{
    console.log('user conected')
    const products = await product.getProduct()
    io.emit('productList',products)
    Socket.on('message', data=>{
        io.emit('log',data)
    })
    Socket.on('product', async newProd=>{
        let newProduct = await product.addProduct(newProd)
        const products= await product.getProduct()
        io.emit('productList',products)
    })
    Socket.on('productdelete',async delProd=>{

        let pid = await product.deleteProduct(delProd)
        const products = await product.getProduct()
        io.emit('productList',products)
    })
})




