import { useEffect, useState } from 'react';
import axios from '../pages/api/axios';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CardContent } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';

const AdminProducts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [productId, setProductId] = useState('');
  const [pName, setPname] = useState('');
  const [formActive, setFormActive] = useState(false);
  const [categories, setCategories] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState('');
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [thumbPreview, setThumbPreview] = useState('');
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleSelectChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSelectDelete = (event) => {
    setCategoryToBeDeleted(event.target.value);
    console.log(categoryToBeDeleted);
  };

  const getCategories = async () => {
    const response = await axios.get('/getCategories');
    setCategories(response.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleNewCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/createCategory', {
        name: newCategory,
      });
      if (response?.data?.success === true) {
        toast.success('Created a new Category Successfully');
        setNewCategory('');
        setCategory('');
      }
      getCategories();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error('Error ');
    }
  };
  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.delete('/deleteCategory', {
        data: { id: categoryToBeDeleted },
      });
      setCategoryToBeDeleted('');
      setCategory('');
      getCategories();
      toast.success(`Deleted `);
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error('Error ');
    }
  };
  /* handling images */
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };
  const handleImage2 = (e) => {
    const files = Array.from(e.target?.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
        setImagesPreview((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbnail(reader.result);
      setThumbPreview(reader.result);
    };
  };

  /* Create a new Product */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.loading('Creating Product...');
      const response = await axios.post('/createProduct', {
        title,
        description,
        price,
        thumbnail,
        images,
        category,
      });

      if (response?.data?.success === true) {
        toast.dismiss();
        toast.success('Created Successfully');
        setTitle('');
        setDescription('');
        setPrice('');
        setThumbnail('');
        setImages([]);
        setCategory('');
        getAllproducts();
        setFormActive(!formActive);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error('Error while Uploading');
    }
  };

  /* Getting Products */

  const getAllproducts = async () => {
    const response = await axios.get('/getAllProducts');

    setProducts(response.data);
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  /* Deleting product */
  const handleDelButton = (product) => {
    setConfirm(true);
    setProductId(product._id);
    setPname(product.title);
  };

  const handleDelete = async (productId) => {
    toast.loading('Deleting...');
    try {
      await axios.delete('/deleteProduct', { data: { id: productId } });
      setConfirm(false);
      toast.dismiss();
      toast.success('Deleted');
      setUpdateForm(false);
      getAllproducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButton = (product) => {
    setFormActive(false);
    setUpdateForm(true);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setProductId(product._id);
    setThumbPreview(product.thumbnail.url);
    setSelectedProduct(product);
    const imagesURL = product.images.map((p) => p.url);
    setImagesPreview(imagesURL);
    console.log(imagesPreview);
  };
  const editProduct = async (productId) => {
    toast.loading('Updating Product...');
    try {
      await axios.put('/updateProduct', {
        id: productId,
        images,
        title,
        price,
        category,
        description,
        thumbnail,
      });

      toast.dismiss();
      toast.success('Product updated');
      getAllproducts();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Error while upload');
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    editProduct(productId);
  };
  const deleteImage = async (url) => {
    const parts = url.split('/');
    const publicIdWithExt = parts.slice(-1)[0]; // "publicid.jpg"
    const publicIdWithoutExt = publicIdWithExt.split('.')[0]; // "publicid"
    const publicId = parts.slice(-2, -1)[0] + '/' + publicIdWithoutExt;
    const productId = selectedProduct?._id;
    const filteredArray = imagesPreview.filter((image) => image !== url);
    setImagesPreview(filteredArray);
    console.log(imagesPreview);

    try {
      await axios
        .delete('/deleteImage', {
          data: { publicId: publicId, productId: productId },
        })
        .then(toast.success('Image Deleted!'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative overflow-hidden mx-auto">
      <Toaster position="top-center"></Toaster>

      {category === 'Add a new category (+)' && (
        <div className="fixed inset-0 bg-gray-800 opacity-90 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 px-4 py-6 rounded-lg">
            <div className="  space-y-2">
              <span
                onClick={() => setCategory('')}
                className="absolute right-3 hover:text-xl cursor-pointer active:text-xl"
              >
                <RxCross2 />
              </span>
              <p className=" font-poppins">Create a new Category</p>
              <form className=" space-y-3" onSubmit={handleNewCategory}>
                <input
                  className="border w-full h-6 px-3 py-3 focus:outline-none rounded-md"
                  type="text"
                  placeholder="Category name"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button className="space-x-1 items-center mb-4 flex border border-solid font-poppins border-neutral-700 px-2 hover:bg-neutral-700 hover:text-white">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {category === 'Delete a category (-)' && (
        <div className="fixed inset-0 bg-gray-800 opacity-90 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 px-4 py-6 rounded-lg">
            <div className="  space-y-2">
              <span
                onClick={() => setCategory('')}
                className="absolute right-3 hover:text-xl cursor-pointer active:text-xl "
              >
                <RxCross2 />
              </span>
              <p className="font-poppins">
                Which Category do you want to delete ?
              </p>
              <form className=" space-y-3" onSubmit={handleDeleteCategory}>
                <select
                  defaultValue={categoryToBeDeleted}
                  onChange={handleSelectDelete}
                  className="border w-full px-3 h-6  focus:outline-none rounded-md"
                >
                  <option disabled selected value="">
                    -- Select a Category --
                  </option>
                  {categories.map((category) => (
                    <option key={category.name} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button className="space-x-1 items-center mb-4 flex border border-solid font-poppins border-neutral-700 px-2 hover:bg-neutral-700 hover:text-white">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between m-4">
        <h1 className="font-poppins font-semibold text-2xl  ">All Products</h1>
        <div className="ml-2 space-x-1 items-center mb-4 flex border border-solid font-poppins border-neutral-700 px-2 hover:bg-neutral-700 hover:text-white">
          <button
            onClick={() => {
              setFormActive(true);
              setUpdateForm(false);
              setImagesPreview([]);
              setThumbPreview('');
            }}
            className=""
          >
            Create New Product
          </button>
          <span>
            <AiFillPlusCircle />
          </span>
        </div>
      </div>

      {formActive && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col font-poppins  items-center border-b border-neutral-700"
        >
          <div
            onClick={() => setFormActive(false)}
            className="absolute right-5 hover:text-xl cursor-pointer"
          >
            <RxCross2 />
          </div>
          <div className=" w-4/6 space-y-4 mx-auto">
            <div>
              <label htmlFor="title">Title:</label>
              <input
                className="border w-full h-6 px-3 py-3 focus:outline-none rounded-md"
                type="text"
                placeholder="enter title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="title">Description:</label>
              <input
                className="border w-full px-3 h-6 py-3 focus:outline-none rounded-md"
                type="text"
                placeholder="enter description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="title">Price:</label>
              <input
                className="border w-full px-3 h-6 py-3 focus:outline-none rounded-md"
                type="text"
                placeholder="enter price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select
                id="my-select"
                value={category}
                onChange={handleSelectChange}
                className="border w-full px-3 h-6  cursor-pointer  focus:outline-none rounded-md"
              >
                <option disabled selected value="">
                  -- Select a Category --
                </option>
                {categories.map((category) => (
                  <option
                    className=" font-poppins"
                    key={category.name}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
                <option className=" font-poppins text-green-500">
                  Add a new category (+)
                </option>
                <option className=" font-poppins text-red-500">
                  Delete a category (-)
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="file">Thumbnail:</label>
              <input
                type="file"
                placeholder="upload image"
                onChange={handleImage}
              />
            </div>
            {thumbPreview && (
              <div>
                <img
                  className=" rounded-md "
                  height={200}
                  width={100}
                  src={thumbnail}
                />
              </div>
            )}

            <div>
              <label htmlFor="file">Images:</label>
              <br />
              <input
                type="file"
                placeholder="upload image"
                onChange={handleImage2}
                multiple
              />
            </div>
            <div className="flex space-x-2">
              {imagesPreview.map((url) => (
                <div className=" relative">
                  <img
                    className=" rounded-md "
                    height={200}
                    width={100}
                    src={url}
                  />
                  <AiFillMinusCircle
                    onClick={() => deleteImage(url)}
                    className="cursor-pointer hover:text-lg active:text-lg text-red-500 absolute top-1 right-1"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="  my-4 flex border border-solid font-poppins border-neutral-700  hover:bg-neutral-700 hover:text-white">
            <button
              className="disabled:bg-gray-400 px-2 disabled:text-white disabled:cursor-not-allowed"
              disabled={!title || !price || !category ? true : false}
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {updateForm && (
        <form
          onSubmit={handleEdit}
          className="flex flex-col font-poppins  items-center border-b border-neutral-700 "
        >
          <div
            onClick={() => setUpdateForm(false)}
            className="absolute right-5 hover:text-xl cursor-pointer"
          >
            <RxCross2 />
          </div>
          <div className=" w-4/6 space-y-4 mx-auto">
            <h1 className="text-xl">Edit Product</h1>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                className="border w-full h-6 px-3 py-3 focus:outline-none rounded-md"
                type="text"
                value={title}
                placeholder="enter title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                className="border w-full px-3 h-6 py-3 focus:outline-none rounded-md"
                type="text"
                value={description}
                placeholder="enter description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                className="border w-full px-3 h-6 py-3 focus:outline-none rounded-md"
                type="text"
                value={price}
                placeholder="enter price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select
                id="my-select"
                value={category}
                onChange={handleSelectChange}
                className="border w-full px-3 h-6  cursor-pointer  focus:outline-none rounded-md"
              >
                <option disabled selected value="">
                  -- Change Category --
                </option>
                {categories.map((category) => (
                  <option
                    className=" font-poppins"
                    key={category.name}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
                <option className=" font-poppins text-green-500">
                  Add a new category (+)
                </option>
                <option className=" font-poppins text-red-500">
                  Delete a category (-)
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="file">Replace Thumbnail:</label>
              <input
                type="file"
                placeholder="upload image"
                onChange={handleImage}
              />
            </div>
            <div>
              <img
                className=" rounded-md "
                height={200}
                width={100}
                src={thumbPreview}
              />
            </div>
            <div>
              <label htmlFor="file">Add Images:</label>
              <br />
              <input
                type="file"
                placeholder="upload image"
                onChange={handleImage2}
                multiple
              />
            </div>
            <div className="flex space-x-2">
              {imagesPreview.map((url) => (
                <div className=" relative">
                  <img
                    className=" rounded-md "
                    height={200}
                    width={100}
                    src={url}
                  />
                  <AiFillMinusCircle
                    onClick={() => deleteImage(url)}
                    className="cursor-pointer hover:text-lg active:text-lg text-red-500 absolute top-1 right-1"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className=" my-4 flex border border-solid font-poppins border-neutral-700 px-2 hover:bg-neutral-700 hover:text-white">
            <button>Submit</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-4 font-poppins font-semibold ">
        {products.map((product, i) => (
          <CardContent
            className="relative  h-full w-full overflow-hidden shadow-lg rounded-md"
            key={i}
          >
            <div className="absolute bottom-0 right-2 space-x-2">
              <button
                onClick={() => handleEditButton(product)}
                className=" hover:text-blue-400"
              >
                <AiFillEdit />
              </button>
              <button
                onClick={() => handleDelButton(product)}
                className=" hover:text-red-400"
              >
                <RiDeleteBin5Fill />
              </button>
            </div>
            <div className="mb-4 ">
              <img src={product.thumbnail?.url} />
              <p className="absolute bottom-0 pb-1">{product.title}</p>
            </div>
          </CardContent>
        ))}
      </div>
      {confirm && (
        <div className="fixed z-50 inset-0 bg-gray-500 bg-opacity-75">
          <div className="absolute space-y-2 text-xs md:text-lg top-1/2 left-1/2 transform text-center font-poppins -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
            <div>
              <p>Are you sure you want to delete </p>
              <p className="font-bold">{pName}?</p>
            </div>
            <div className=" space-x-4">
              <button
                onClick={() => handleDelete(productId)}
                className=" p-1 drop-shadow-md w-10 bg-green-300 rounded-md hover:text-white active:text-white hover:bg-green-800 active:bg-green-800"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirm(false)}
                className=" p-1 drop-shadow-md w-10 bg-red-300 rounded-md hover:text-white active:text-white hover:bg-red-800 active:bg-red-800"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
