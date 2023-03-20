import { useEffect, useState } from 'react';
import axios from '../pages/api/axios';

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [products, setProducts] = useState([]);
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

  return (
    <div>
      <h1>Create Product</h1>
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
      <div>
        {products.map((product, i) => (
          <div key={i}>
            <h1>{product.title}</h1>
            <img src={product.image.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateProduct;
