import ProductModel from '../model/Product.model.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'duo5kgnop',
  api_key: '795842468561665',
  api_secret: 'b97XsvtYfZ81hMitSDw_CLQricw',
});

export async function createProduct(req, res) {
  const { title, description, price, thumbnail, category } = req.body;
  if (!title || !price) return res.status(400).json({ msg: 'Details missing' });
  try {
    const uploadedImage = await cloudinary.uploader.upload(thumbnail, {
      folder: 'products',
    });
    const imageURL = uploadedImage.secure_url;
    const imagePublicId = uploadedImage.public_id;

    let images = [...req.body.images];
    let imagesBuffer = [];
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const uploadedimages = await cloudinary.uploader.upload(images[i], {
          folder: 'products',
        });
        imagesBuffer.push({
          public_id: uploadedimages.public_id,
          url: uploadedimages.secure_url,
        });
      }
      req.body.images = imagesBuffer;
    }
    const product = await ProductModel.create({
      title,
      description,
      price,
      category,
      thumbnail: {
        public_id: imagePublicId,
        url: imageURL,
      },
      images: req.body.images,
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
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
    foundProduct.images.map(
      async (product) => await cloudinary.uploader.destroy(product.public_id)
    );

    await ProductModel.deleteOne({ _id: foundProduct._id });
    res.status(200).json({ success: true, foundProduct });
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(req, res) {
  const productId = req.body.id;
  if (!productId) return res.sendStatus(405);

  try {
    const currentProduct = await ProductModel.findOne({
      _id: productId,
    }).exec();

    const updates = req.body.updates;
    console.log(currentProduct);
    if (updates.thumbnail) {
      await cloudinary.uploader.destroy(currentProduct.thumbnail.public_id);

      const newImage = await cloudinary.uploader.upload(updates.thumbnail, {
        folder: 'products',
      });

      updates.thumbnail = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const product = await ProductModel.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
  }
}
