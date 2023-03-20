import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useLogout from '@/hooks/useLogout';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { selectItems } from '@/slices/bagSlice';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiShoppingBag } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';

function NavBar({ showBar, filtered }) {
  const scrollPosition = useScrollPosition();
  const logout = useLogout();
  const items = useSelector(selectItems);
  const total = items.map((item, i) => item.cartQuantity * 1);
  const sum = total.reduce((sum, a) => sum + a, 0);
  const [data, setData] = useState({});
  const router = useRouter();
  const signout = async () => {
    await logout();
    setData({});
    router.push('/');
  };
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get('/user', {
          signal: controller.signal,
        });

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const rolesObject = data.roles;

  return (
    <main>
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
          {rolesObject?.hasOwnProperty('Admin') ? (
            <div>
              <Link href={'/admin'}>
                <p className=" hover:bg-black hover:text-white active:bg-black active:text-white font-poppins font-semibold bg-white text-black p-1 rounded-md">
                  Admin
                </p>
              </Link>
            </div>
          ) : (
            <></>
          )}

          <div className="cursor-pointer">
            <Link href={'/login'}>
              <HiUser size={28} />
            </Link>
          </div>
          {data.username ? (
            <div className=" flex space-x-4">
              <div className="flex space-x-2">
                <p className=" relative top-1 font-poppins">Hi</p>
                <p className=" relative top-1 font-poppins font-semibold">
                  {data.username}
                </p>
              </div>
              <div>
                <button
                  className=" text-xs underline text-blue-500"
                  onClick={signout}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
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
    </main>
  );
}

export default NavBar;
