import axios from '@/pages/api/axios';
import Category from '@/pages/category/[category]';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx';

function DropDown({ showBar }) {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const response = await axios.get('/getCategories');

    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="text-blue-900">
      <div onClick={showBar} className=" absolute right-2 p-4 cursor-pointer">
        <RxCross1 size={24} />
      </div>
      <div className="text-center pt-20 ">
        <input
          className=" border border-solid rounded-md bg-gray-100 "
          type="search"
          placeholder=" Search..."
        />
      </div>
      <div className=" text-center pt-10 flex flex-col space-y-3 text-3xl">
        <p className=" text-red-500">New Year's Sale</p>
        <Link href={'/login'}>
          <p>Login</p>
        </Link>
        {categories.map((category, i) => (
          <Link onClick={showBar} key={i} href={`/category/${category.name}`}>
            <p>{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DropDown;
