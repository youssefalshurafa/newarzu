import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiShoppingBag } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';
function NavBar({ showBar }) {
  const scrollPosition = useScrollPosition();

  return (
    <div>
      <div
        className={
          scrollPosition > 0
            ? 'flex w-full pl-5 pt-2 h-12 justify-between text-black bg-slate-100 shadow-black'
            : 'flex w-full pl-5 pt-2 justify-between text-white '
        }
      >
        <div className="text-2xl font-poppins font-semibold ml-9 tracking-wider">
          <h1>Arzu</h1>
        </div>
        <div className="hidden lg:flex text-center  text-xl space-x-10">
          <p className="cursor-pointer">New</p>
          <p className=" text-red-600 cursor-pointer">New Year Sale </p>
          <p className="cursor-pointer">Tunics</p>
          <p className="cursor-pointer">Jackets</p>
          <p className="cursor-pointer">Knitwear</p>
        </div>
        <div className="flex  space-x-3 px-8">
          <div className="cursor-pointer">
            <HiUser size={28} />
          </div>
          <div className="cursor-pointer">
            <HiShoppingBag size={28} />
          </div>
          <div className=" lg:hidden cursor-pointer" onClick={showBar}>
            <GiHamburgerMenu size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
