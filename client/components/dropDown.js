import Link from 'next/link';
import React from 'react';
import { RxCross1 } from 'react-icons/rx';
function DropDown({ showBar, filtered }) {
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
        {filtered?.map((e, i) => (
          <Link href={`/category/${e.category}`}>
            <p className="cursor-pointer" key={i}>
              {e.category}
            </p>
          </Link>
        ))}
        <div>
          <p>Login</p>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
