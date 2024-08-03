import { fakerES as faker} from '@faker-js/faker';
import { v4 as uuidv4} from 'uuid';
import { productModel } from '../persistences/mongo/models/product.model.js';

export const generateProductsMocks = (amount) => {
    const products = [];

    for(let i = 0; i < amount; i++){
        const product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            thumbnail: [],
            code: uuidv4(),
            stock: faker.number.int({min: 1, max: 1000}),
            status: Math.random() >= 0.5,
            price: faker.commerce.price(),
            category: faker.commerce.productAdjective(),
        };

        products.push(product);
    }

    productModel.insertMany(products);

    return products;
}