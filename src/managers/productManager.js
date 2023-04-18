import fs from 'fs';

const path = './files/products.json';

export default class ProductManager {

    getProducts = async() =>{

        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const users = JSON.parse(data);
            return users;
        }else {
            return [];
        }
    }
    getProduct = async(id) =>{
        const products = await this.getProducts();
        
        const product = products.filter((product)=>{
            return product.id == id
        })

        return product

    }
}