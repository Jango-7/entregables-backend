class ProductManager {
    constructor() {
        this.products = []
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock){

        for (let i = 0; i < this.products.length; i++){
            if(this.products[i].code === code){
                console.log(`El código ${code} está repetido`);
                break;
            }
        }

        const newProduct = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock,
        }

        if(!Object.values(newProduct).includes(undefined)){
            ProductManager.id++
            this.products.push({
                ...newProduct,
                id: ProductManager.id
            });
        }else{
            console.log("Todos los campos son obligatorios");
        }
    }

    getProduct(){
        return this.products;
    }

    existe (id){
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id){
        if(!this.existe(id)){
            console.log("Product not found !");
        }else {
            console.log(this.existe(id));
        }
    }
}

const productos = new ProductManager
//---- Testing al array vacío ----
// console.log(productos.getProduct());

//---- Agregar producto ----
productos.addProduct('Kipitos', 'Azucar explosiva', 500, 'imagen01', 'k001', 1500)
productos.addProduct('Bonbonbum', 'Chupetin de sabores', 300, 'imagen02', 'k002', 1500)
productos.addProduct('Choclitos', 'Tortillas de maiz sabor limón', 1800, 'imagen03', 'k003', 800)
productos.addProduct('Chocorramo', 'Bizcocho cubierto de chocolate', 1200, 'imagen04', 'k004', 600)

//---- Validación de código repetido ----
// productos.addProduct('Chocorramo', 'Bizcocho cubierto de chocolate', 1200, 'imagen04', 'k004', 600)


// --- Se muestra el array con los productos ----
// console.log(productos.getProduct());

// ----- Búsqueda del producto por ID y producto "not found" (id > 4)----- 
productos.getProductById(5)