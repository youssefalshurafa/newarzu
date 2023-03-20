import { useStateContext } from '@/context/ContextProvider';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiUser } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
const AdminNavbar = () => {
  const { isActiveMenu, setIsActiveMenu } = useStateContext();
  const handleActiveMenu = () => setIsActiveMenu(!isActiveMenu);
  return (
    <div className="flex  h-12 bg-slate-100 items-center drop-shadow-md ">
      <div className="font-semibold font-poppins text-2xl ml-2 ">
        <h1>Arzu</h1>
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
        <p className=" font-poppins text-slate-800 mx-2 font-bold"> John</p>
        <HiUser size={24} />
      </div>
    </div>
  );
};

export default AdminNavbar;
