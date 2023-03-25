import Link from 'next/link';
import React from 'react';
import { ImUsers } from 'react-icons/im';
import { FaUserTie } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsPieChartFill } from 'react-icons/bs';
import { useStateContext } from '@/context/ContextProvider';

const AdminSidebar = () => {
  const { handleClick, isClicked, isActiveMenu, setIsActiveMenu } =
    useStateContext();

  return (
    <div className="mt-1 mr-3 h-screen z-20  w-60 bg-slate-100 rounded-md shadow-md">
      <div className="pt-12 space-y-4">
        <div className="flex justify-between px-4 cursor-pointer hover:bg-pink-800  hover:text-white h-8 items-center rounded-md">
          <p className=" font-poppins font-semibold">Dashboard</p>
          <BsPieChartFill size={18} />
        </div>
        <div
          onClick={() => handleClick('customers')}
          className={
            isClicked.customers
              ? ' flex justify-between px-4 cursor-pointer bg-pink-800  text-white h-8 items-center rounded-md'
              : 'flex justify-between px-4 cursor-pointer hover:bg-pink-800  hover:text-white h-8 items-center rounded-md'
          }
        >
          <p className=" font-poppins font-semibold">Customers</p>
          <ImUsers size={18} />
        </div>
        <div className="flex justify-between px-4 cursor-pointer hover:bg-pink-800  hover:text-white h-8 items-center rounded-md">
          <p className=" font-poppins font-semibold">Employees</p>
          <FaUserTie size={18} />
        </div>
        <div className="flex justify-between px-4 cursor-pointer hover:bg-pink-800  hover:text-white h-8 items-center rounded-md">
          <p className=" font-poppins font-semibold">Orders</p>
          <HiShoppingCart size={18} />
        </div>
        <div
          onClick={() => {
            handleClick('products');
            setIsActiveMenu(!isActiveMenu);
          }}
          className={
            isClicked.products
              ? ' flex justify-between px-4 cursor-pointer bg-pink-800  text-white h-8 items-center rounded-md'
              : 'flex justify-between px-4 cursor-pointer hover:bg-pink-800  hover:text-white h-8 items-center rounded-md'
          }
        >
          <p className=" font-poppins font-semibold">Products</p>
          <AiFillPlusCircle size={18} />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
