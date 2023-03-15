import ProductModel from '../model/Product.model.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

export async function createProduct(req, res) {
  const {
    title,
    code,
    description,
    price,
    material,
    stock,
    thumbnail,
    images,
  } = req.body;
  if (!title || !code || price || category)
    return res.status(400).json({ msg: 'Details missing' });
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'products',
    });
    const product = await ProductModel.create({
      title,
      description,
      price,

      thumbnail: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
}
