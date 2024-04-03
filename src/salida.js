const ProductManager = require('./ProductManager.js');

const manager = new ProductManager('productsM.json');

// Ejemplos de uso de los métodos
manager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 100,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'ABC123',
    stock: 10
});

console.log(manager.getProducts());

const productId = 1; // ID del producto a actualizar o eliminar
manager.updateProduct(productId, { price: 150 }); // Actualizar el precio del producto
console.log(manager.getProductById(productId));

manager.deleteProduct(productId); // Eliminar el producto con el ID especificado
console.log(manager.getProducts());