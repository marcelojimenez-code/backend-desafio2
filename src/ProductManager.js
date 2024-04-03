const fs = require('fs').promises

class ProductManager {
    constructor() {
        this.path = 'productsM.json';
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            
            if(error.code === 'ENOENT'){
                this.products = [];
            }
            else{
                throw error
            }
        }
    }

    addProduct(product) {

        if (!this.isProductValid(product)){
            console.log("Error : Producto invalido")
            return
        }

        if(this.isCodeDuplicate(product.code)){
            console.log("Error : El codigo del Producto ya esta en uso")
            return
        }

        product.id = this.products.length + 1
        this.products.push(product)  

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find( (p)=>p.id === id )
        if(product){
            return product
        }
        else{
            console.log("Error : producto no encontrado")
        }
    }

    isProductValid(product){
        return(
            product.title && 
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code){
        return this.products.some((p)=>p.code === code)
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.addProduct();
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.addProduct();
    }
}

module.exports = ProductManager;