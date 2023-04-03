import { useStateContext } from '@/context/ContextProvider';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiUser } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
const AdminNavbar = () => {
  const { isActiveMenu, setIsActiveMenu } = useStateContext();
  const handleActiveMenu = () => setIsActiveMenu(!isActiveMenu);
  const { auth } = useAuth();
  const logout = useLogout();
  const router = useRouter();
  const signout = async () => {
    await logout();
    router.push('/');
  };
  console.log(auth);
  return (
    <div className=" w-full flex h-12 bg-slate-100 items-center drop-shadow-md ">
      <div className="font-semibold font-poppins text-2xl ml-2 ">
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
        <p className=" font-poppins text-slate-800">Hi, </p>
        <p className=" font-poppins text-slate-800 mx-2 font-bold">
          {' '}
          {auth.user}
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
