import { productResponseDto } from "../dto/product-response.dto.js";
import customErrors from "../errors/customErrors.js";
import productsRepository from "../persistences/mongo/repositories/products.repository.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";

const getAll = async (query, options) => {
  const products = await productsRepository.getAll(query, options);
  return products;
};

const getById = async (id) => {
  const productData = await productsRepository.getById(id);
  const product = productResponseDto(productData);
  return product;
};

const create = async (data, user) => {
  let productData = data;
  if (user.role === "premium") {
    productData = { ...data, owner: user._id };
  }

  const product = await productsRepository.create(productData);
  return product;
};

const update = async (id, data, user) => {
  const productData = await productsRepository.getById(id);
  if (user.role === "premium" && productData.owner !== user._id) {
    throw customErrors.unauthorizedError("User not authorized");
  }
  const product = await productsRepository.update(id, data);
  return product;
};

const deleteOne = async (id, user) => {
  const productData = await productsRepository.getById(id);
  if (user.role === "premium" && productData.owner !== user._id) {
    throw customErrors.unauthorizedError("User not authorized");
  }

  if (user.role === "admin" && productData.owner !== user._id) {
    const ownerUser = await userRepository.getById(productData.owner);
    //Comente este codigo porque no me siento comodo agregando las credenciales de mi email
    // const message = `Tu producto ${productData.title} ha sido eliminado por un administrador!`;
    // await sendMail(
    //   user.email,
    //   `Producto ${productData.title} eliminado`,
    //   message
    // );
  }

  const product = await productsRepository.deleteOne(id);
  return product;
};

export default {
  getAll,
  getById,
  update,
  deleteOne,
  create,
};
