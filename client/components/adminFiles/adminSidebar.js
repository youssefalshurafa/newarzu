import Link from 'next/link';
import React from 'react';
import { ImUsers } from 'react-icons/im';
import { FaUserTie } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { BsPieChartFill } from 'react-icons/bs';
import { GoFileMedia } from 'react-icons/go';
import { useStateContext } from '@/context/ContextProvider';

const AdminSidebar = () => {
  const { handleClick, isClicked, isActiveMenu, setIsActiveMenu } =
    useStateContext();

  return (
    <div className="mt-1 mr-3 h-screen z-20 text-zinc-400  w-60  bg-gray-800 rounded-md shadow-md">
      <div className="pt-12 ">
        <div
          className={`mt-3 flex justify-between px-4 cursor-pointer hover:bg-indigo-500 hover:text-white  h-8 items-center rounded-md ${
            isClicked.dashboard && 'bg-indigo-500 text-white '
          }`}
        >
          <p className=" font-poppins font-semibold">Dashboard</p>
          <BsPieChartFill size={18} />
        </div>

        <div
          className={`mt-3 flex justify-between px-4 cursor-pointer hover:bg-indigo-500 hover:text-white  h-8 items-center rounded-md ${
            isClicked.employees && 'bg-indigo-500 text-white '
          }`}
        >
          <p className=" font-poppins font-semibold">Employees</p>
          <FaUserTie size={18} />
        </div>
        <div
          className={`mt-3 flex justify-between px-4 cursor-pointer hover:bg-indigo-500 hover:text-white  h-8 items-center rounded-md ${
            isClicked.users && 'bg-indigo-500 text-white '
          }`}
        >
          <p className=" font-poppins font-semibold">Users</p>
          <FiUsers size={18} />
        </div>
        <Link href={'/adminOrders'}>
          <div
            onClick={() => {
              handleClick('orders');
              setIsActiveMenu(!isActiveMenu);
            }}
            className={`mt-3 flex justify-between px-4 cursor-pointer hover:bg-indigo-500 hover:text-white  h-8 items-center rounded-md ${
              isClicked.orders && 'bg-indigo-500 text-white '
            }`}
          >
            <p className=" font-poppins font-semibold">Orders</p>

            <HiShoppingCart size={18} />
          </div>
        </Link>
        <Link href={'/adminProducts'}>
          <div
            onClick={() => {
              handleClick('products');
              setIsActiveMenu(!isActiveMenu);
            }}
            className={`mt-3 flex justify-between px-4 cursor-pointer hover:bg-indigo-500 hover:text-white  h-8 items-center rounded-md ${
              isClicked.products && 'bg-indigo-500 text-white '
            }`}
          >
            <p className=" font-poppins font-semibold">Products</p>

            <AiFillPlusCircle size={18} />
          </div>
        </Link>
        <Link href={'/assets'}>
          <div
            onClick={() => {
              handleClick('assets');
              setIsActiveMenu(!isActiveMenu);
            }}
            className={`mt-3 flex justify-between px-4 cursor-pointer hover:bg-indigo-500 hover:text-white  h-8 items-center rounded-md ${
              isClicked.assets && 'bg-indigo-500 text-white '
            }`}
          >
            <p className=" font-poppins font-semibold">Assets Management</p>

            <GoFileMedia size={18} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
