import { useEffect, useState } from 'react';
import axios from '../pages/api/axios';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CardContent } from '@mui/material';

const AdminProducts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [products, setProducts] = useState([]);
  const [confirm, setConfirm] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/createProduct', {
        title,
        description,
        price,
        image,
      });
      if (response?.data?.success === true) {
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getAllproducts = async () => {
      const response = await axios.get('/getAllProducts');

      setProducts(response.data);
    };
    getAllproducts();
  }, []);
  // const handleDeleteButton = (product) => {
  //   setConfirm(true);
  //   setProductId(product._id);
  //   console.log(productId);
  // };

  const handleDelete = async (product) => {
    try {
      // await axios.delete('/deleteProduct', { data: { id: product._id } });
      console.log(product._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className=" relative">
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
                  onClick={() => handleDelete(product)}
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
          <div className="absolute m-auto left-0 right-0 top-20 text-sm bg-gray-100 font-poppins text-center shadow-lg p-2 space-y-2 rounded-md w-max h-max overflow-hidden ">
            <div>
              <p>Are you sure</p>
              <p> you want to delete?</p>
            </div>
            <div className=" space-x-4">
              <button className=" p-1 drop-shadow-md w-10 bg-green-300 rounded-md hover:text-white active:text-white hover:bg-green-800 active:bg-green-800">
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AdminProducts;
