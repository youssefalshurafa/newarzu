import ProductModel from '../model/Product.model.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'duo5kgnop',
  api_key: '795842468561665',
  api_secret: 'b97XsvtYfZ81hMitSDw_CLQricw',
});

export async function createProduct(req, res) {
  const { title, description, price, thumbnail, category, material } = req.body;
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
      material,
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
  try {
    const products = await ProductModel.find();
    if (!products) return res.status(404);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProduct(req, res) {
  try {
    if (!req?.body?.id) return res.status(400).json({ msg: 'id missing' });
    const foundProduct = await ProductModel.findOne({
      _id: req.body.id,
    }).exec();
    if (!foundProduct)
      return res.status(404).json({ msg: 'Product ID not found!' });

    const imgId = foundProduct.thumbnail.public_id;
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
    foundProduct.images.map((product) =>
      cloudinary.uploader.destroy(product.public_id)
    );

    await ProductModel.findOneAndDelete(
      { _id: foundProduct._id },
      (err, deletedDoc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(deletedDoc);
          res.status(200).json({ msg: `deleted ${deletedDoc}` });
        }
      }
    ).clone();
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(req, res) {
  const productId = req.body.id;
  if (!productId) return res.sendStatus(405);
  const data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    material: req.body.material,
  };
  try {
    const currentProduct = await ProductModel.findOne({
      _id: productId,
    }).exec();

    if (req.body.thumbnail !== '') {
      const imgId = currentProduct.thumbnail.public_id;
      await cloudinary.uploader.destroy(imgId);

      const newImage = await cloudinary.uploader.upload(req.body.thumbnail, {
        folder: 'products',
      });

      data.thumbnail = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

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
      await ProductModel.findOneAndUpdate(
        { _id: productId },
        { $push: { images: imagesBuffer } },
        { new: true }
      );
    }
    const product = await ProductModel.findByIdAndUpdate(productId, data, {
      new: true,
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteImage(req, res) {
  const productId = req.body.productId;
  const publicId = req.body.publicId;
  console.log(publicId);
  try {
    await cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });

    await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $pull: { images: { public_id: publicId } } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      }
    ).clone();
  } catch (error) {
    console.error(error);
  }
}
