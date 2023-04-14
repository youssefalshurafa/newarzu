import AdminSidebar from '@/components/adminSidebar';
import AdminNavbar from './adminNavbar';
import { useStateContext } from '@/context/ContextProvider';

const Layout = ({ children }) => {
  const { isActiveMenu, isClicked } = useStateContext();
  return (
    <>
      <div className="fixed w-full z-20">
        <AdminNavbar />
      </div>
      <div>
        <div
          className={`fixed left-0 z-10 mt-4 ${
            isActiveMenu
              ? ' transform translate-x-0 duration-500'
              : 'transform  -translate-x-full duration-500'
          }`}
        >
          <AdminSidebar />
        </div>
        <div className="absolute top-14">{children}</div>
      </div>
    </>
  );
};

export default Layout;
