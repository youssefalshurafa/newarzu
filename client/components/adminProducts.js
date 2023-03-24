import { useEffect, useState } from 'react';
import axios from '../pages/api/axios';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CardContent } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';

const AdminProducts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [productId, setProductId] = useState('');
  const [pName, setPname] = useState('');

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
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
        image,
      });

      if (response?.data?.success === true) {
        toast.dismiss();
        toast.success('Created Successfully');
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        getAllproducts();
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
      getAllproducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative">
      <div className=" relative">
        <Toaster position="top-center"></Toaster>
        <h1 className="font-poppins font-semibold text-2xl m-4 ">
          All Products
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-4 font-poppins font-semibold ">
          {products.map((product, i) => (
            <CardContent
              className="relative  h-full w-full overflow-hidden shadow-lg rounded-md"
              key={i}
            >
              <div className="absolute bottom-0 right-2 space-x-2">
                <button className=" hover:text-blue-400">
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
                <img src={product.image.url} />
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
      <form onSubmit={handleSubmit} className="space-y-5 ml-3">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          placeholder="enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="title">Desc:</label>
        <input
          type="text"
          placeholder="enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <label htmlFor="title">Price:</label>
        <input
          type="text"
          placeholder="enter price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label htmlFor="file">image:</label>
        <input type="file" placeholder="upload image" onChange={handleImage} />
        <br />
        <br />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AdminProducts;
