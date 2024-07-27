import fs from "fs";

let products = [];
let pathFile = "./src/data/products.json";

const addProduct = async (product) => {
    
    const {title, description, price, thumbnail, code, stock} = product;
    await getProducts();

    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true
    };

    if(Object.values(newProduct).includes(undefined)){
        console.log("Todos los campos son obligatorios!");
        return;
    }

    products.push(newProduct);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const getProducts = async(limit) => {
    const productsJson = await fs.promises.readFile(pathfile, "utf8");
    products = JSON.parse(productsJson) || [];

    if(!limit) return products;

    return products.slice(0, limit);
}

const getProductById = async(id) => {
    await getProducts();
    const product = products.find((p) => p.id === id);
    if(!product){
        console.log(`No se encontro el producto con le id ${id}`);
        return;
    }

    console.log(product);
    return product;
};


const updateProduct = async (id, dataProduct) =>{
    await getProducts();
    const index = products.findIndex((p) => p.id === id);
    products[index] = {
        ...products[index],
        ...dataProduct,
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

const deleteProduct = async(id) => {
    await getProducts();
    products = products.filter( (product) => product.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

export default {
    addProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,

};