import ProductModel from '../model/Product.model.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'duo5kgnop',
  api_key: '795842468561665',
  api_secret: 'b97XsvtYfZ81hMitSDw_CLQricw',
});

export async function createProduct(req, res) {
  const { title, description, price, thumbnail, images } = req.body;
  if (!title || !price) return res.status(400).json({ msg: 'Details missing' });
  try {
    const uploadedImage = await cloudinary.uploader.upload(thumbnail, {
      folder: 'products',
    });
    const imageURL = uploadedImage.secure_url;
    const imagePublicId = uploadedImage.public_id;

    let imagesURL, imagesPublicId;
    if (images) {
      const uploadedimages = await cloudinary.uploader.upload(images, {
        folder: 'products',
      });
      imagesURL = uploadedimages.secure_url;
      imagesPublicId = uploadedimages.public_id;
    }
    const product = await ProductModel.create({
      title,
      description,
      price,
      thumbnail: {
        public_id: imagePublicId,
        url: imageURL,
      },
      images: {
        public_id: imagesPublicId,
        url: imagesURL,
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
    const imgId = foundProduct.thumbnail.public_id;
    const imagesId = foundProduct.images.public_id;
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
    if (imagesId) {
      await cloudinary.uploader.destroy(imagesId);
    }
    await ProductModel.deleteOne({ _id: foundProduct._id });
    res.status(200).json({ success: true, foundProduct });
  } catch (error) {
    console.log(error);
  }
}
