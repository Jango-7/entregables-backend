// const http = require('http')
// const server = http.createServer((request, response) => {
//     response.end('Mi primer hola mundo actual con nodemon')
// })
// server.listen(8080, () => {
//     console.log('Server run on port: 8080');
// })

// =====================

import fs from "fs"

export class ProductManager {
    constructor(path) {
        this.path = path,
            this.products = [
            ]
    }
    //READ
    getProducts = async () => {
        const productList = await fs.promises.readFile(this.path, "utf-8")
        const productListParse = JSON.parse(productList)
        return productListParse
    }

    //GENERATE ID 
    generateId = async () => {
        const counter = this.products.length
        if (counter == 0) {
            return 1
        }
        else {
            return (this.products[counter - 1].id) + 1
        }
    }
    
    //CREATE
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO")
            return
        }
        else {
            const codigoRepetido = this.products.find(elemento => elemento.code === code)
            if (codigoRepetido) {
                console.error("El código que desea agregar se encuentra repetido")
                return
            }
            else {
                const id = await this.generateId()
                const newProduct = {
                    id, 
                    title, 
                    description, 
                    price, 
                    thumbnail, 
                    code, 
                    stock
                }
                this.products.push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            }
        }
    }


    //UPDATE
    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        if (!id || !title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Debe ingresar todos los datos correspondientes")
            return
        }
        else {
            const allProducts = await this.getProducts()
            const codigoRepetido = allProducts.find(elemento => elemento.code === code)
            if (codigoRepetido) {
                console.error("El código que desea actualizar se encuentra repetido")
                return
            }
            else {
                const currentProductList = await this.getProducts()
                const newProductList = currentProductList.map(elemento => {
                    if (elemento.id === id) {
                        const updatedProduct = {
                            ...elemento,
                            title, description, price, thumbnail, code, stock
                        }
                        return updatedProduct
                    }
                    else {
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.path, JSON.stringify(newProductList, null, 2))
            }

        }
    }


    //DELETE
    deleteProduct = async (id) => {
        const allProducts = await this.getProducts()
        const productosNoEncontrados = allProducts.filter(elemento => elemento.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(productosNoEncontrados, null, 2))
    }
    getProductbyId = async (id) => {
        const allProducts = await this.getProducts()
        const found = allProducts.find(element => element.id === id)
        return found
    }


}

// async function generator() {

//     const productManager = new ProductManager("./files/products.json");

//     await productManager.addProduct('Kipitos', 'Azucar explosiva', 500, 'imagen01', 'k001', 1500)
//     await productManager.addProduct('Bonbonbum', 'Chupetin de sabores', 300, 'imagen02', 'k002', 1500)
//     await productManager.addProduct('Choclitos', 'Tortillas de maiz sabor limón', 1800, 'imagen03', 'k003', 800)
//     await productManager.addProduct('Chocorramo', 'Bizcocho cubierto de chocolate', 1200, 'imagen04', 'k004', 600)

//     // await productManager.updateProduct(3, "Alqueria", "Leche descremada", 1500, "imagen05", "k005", 500)

//     // await productManager.deleteProduct(2)

//     // const solo = await productManager.getProductbyId(1)

//     const listado = await productManager.getProducts()
//     console.log(listado)
// }

// generator()