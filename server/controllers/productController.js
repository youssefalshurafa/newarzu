import ProductModel from '../model/Product.model.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'duo5kgnop',
  api_key: '795842468561665',
  api_secret: 'b97XsvtYfZ81hMitSDw_CLQricw',
});

export async function createProduct(req, res) {
  const { title, code, description, price, material, stock, thumbnail, image } =
    req.body;
  if (!title || !price) return res.status(400).json({ msg: 'Details missing' });
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'products',
    });
    const product = await ProductModel.create({
      title,
      description,
      price,

      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
}
export async function getAllProducts(req, res) {
  const products = await ProductModel.find();
  if (!products) return res.status(404);
  res.json(products);
}
export async function deleteProduct(req, res) {
  if (!req?.body?.id) return res.status(400).json({ msg: 'id missing' });
  try {
    const foundProduct = await ProductModel.findOne({
      _id: req.body.id,
    }).exec();
    if (!foundProduct)
      return res.status(404).json({ msg: 'Product ID not found!' });
    const imgId = foundProduct.image.public_id;
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
    await ProductModel.deleteOne({ _id: foundProduct._id });
    res.status(200).json({ success: true, foundProduct });
  } catch (error) {
    console.log(error);
  }
}
