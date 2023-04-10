import CheckoutWizard from '@/components/checkoutWizard';
import { selectItems } from '@/slices/bagSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from './api/axios';

const Checkout = () => {
  const items = useSelector(selectItems);

  const [customerName, setCustomerName] = useState('');
  const [gov, setGov] = useState('');
  const [city, setCity] = useState('');
  const [add, setAdd] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneTwo, setPhoneTwo] = useState('');
  const [email, setEmail] = useState('');

  const address = add + ',' + city + ',' + gov;

  const handleSubmit = async () => {
    try {
      await axios.post('/newOrder', {
        customerName,
        phone,
        phoneTwo,
        email,
        address,
        items,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <CheckoutWizard activeStep={1} />
      </div>
      <div className="md:grid md:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          className="border md:col-span-3 mx-5 shadow-md p-2 "
        >
          <div className="ml-2">
            <label>Full Name :</label>
            <span className="text-red-500"> *</span>
            <br />
            <input
              className="border mb-2"
              type="text"
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <br />
            <label>Governorate :</label>
            <span className="text-red-500"> *</span>
            <br />
            <input
              className="border mb-2"
              type="text"
              onChange={(e) => setGov(e.target.value)}
            />
            <br />
            <label>City :</label>
            <span className="text-red-500"> *</span>
            <br />
            <input
              className="border mb-2"
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
            <br />
            <label>Address :</label>
            <span className="text-red-500"> *</span>
            <br />
            <input
              className="border mb-2"
              type="text"
              onChange={(e) => setAdd(e.target.value)}
            />
            <br />
            <label>Phone Number :</label>
            <span className="text-red-500"> *</span>
            <br />
            <input
              className="border mb-2"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <label>Another Phone Number :</label>
            <br />
            <input
              className="border mb-2"
              type="text"
              onChange={(e) => setPhoneTwo(e.target.value)}
            />
            <br />
            <label>Email address :</label>
            <br />
            <input
              className="border mb-2"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="ml-2 my-3">
            <button className=" flex border border-solid font-poppins border-neutral-700 px-2 hover:bg-neutral-700 hover:text-white">
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
