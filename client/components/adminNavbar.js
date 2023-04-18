import { useStateContext } from '@/context/ContextProvider';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiUser } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
const AdminNavbar = () => {
  const { isActiveMenu, setIsActiveMenu } = useStateContext();
  const handleActiveMenu = () => setIsActiveMenu(!isActiveMenu);
  const logout = useLogout();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const signout = async () => {
    await logout();
    router.push('/');
  };
  useEffect(() => {
    setUsername(Cookies.get('username'));
  }, []);

  return (
    <div className=" w-full bg-gray-800 flex h-12 text-zinc-400 items-center  ">
      <div className="font-semibold font-poppins text-2xl ml-6 ">
        <Link href="/">
          <h1>Arzu</h1>
        </Link>
      </div>
      <div className="ml-6 p-1 cursor-pointer items-center">
        {isActiveMenu ? (
          <button type="button" onClick={handleActiveMenu}>
            <RxCross2 size={24} />
          </button>
        ) : (
          <button type="button" onClick={handleActiveMenu}>
            <AiOutlineMenu size={24} />
          </button>
        )}
      </div>
      <div className="absolute right-2 p-2 flex">
        <p className=" font-poppins text-zinc-400">Hi, </p>
        <p className=" font-poppins text-zinc-400 mx-2 font-bold">
          {' '}
          {username}
        </p>
        <HiUser size={24} />
        <div>
          <button
            className=" text-xs underline text-blue-500"
            onClick={signout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
