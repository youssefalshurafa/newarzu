import { useScrollPosition } from '@/hooks/useScrollPosition';
import { selectItems } from '@/slices/bagSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiShoppingBag } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';
function NavBar({ showBar, filtered }) {
  const scrollPosition = useScrollPosition();
  const items = useSelector(selectItems);
  const [bagItems, setBagItems] = useState(0);
  const total = items.map((item, i) => item.cartQuantity * 1);
  const sum = total.reduce((sum, a) => sum + a, 0);
  return (
    <div>
      <div
        className={
          scrollPosition > 0
            ? 'flex w-full  pl-5 pt-1 h-10 justify-between text-neutral-700 bg-slate-100 shadow-black'
            : 'flex w-full pl-5 pt-1 justify-between text-neutral-700 '
        }
      >
        <div className="text-2xl font-poppins font-semibold  tracking-wider justify-between ">
          <Link href="/">
            <h1>Arzu</h1>
          </Link>
        </div>
        <div className="hidden lg:flex text-center  text-base space-x-10">
          <div className="flex space-x-5 font-poppins ">
            {filtered?.map((e, i) => (
              <Link href={`/category/${e.category}`}>
                <p className="cursor-pointer" key={i}>
                  {e.category}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex  space-x-3 px-8">
          <div className="cursor-pointer">
            <Link href={'/login'}>
              <HiUser size={28} />
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link href={'/cart'}>
              <HiShoppingBag size={28} />
            </Link>
          </div>

          {sum > 0 ? (
            <div className="w-6 h-6 text-center  bg-neutral-700 text-white rounded-full relative right-4 bottom-1 z-20">
              <span className="text-xs font-bold">{sum}</span>
            </div>
          ) : (
            <></>
          )}

          <div className=" lg:hidden cursor-pointer" onClick={showBar}>
            <GiHamburgerMenu size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
