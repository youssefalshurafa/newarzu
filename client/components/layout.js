import AdminSidebar from '@/components/adminSidebar';
import AdminNavbar from './adminNavbar';
import { useStateContext } from '@/context/ContextProvider';

const Layout = ({ children }) => {
  const { isActiveMenu, isClicked } = useStateContext();
  return (
    <>
      <AdminNavbar />
      <div className="fixed left-0 z-10 mt-4">
        {isActiveMenu ? <AdminSidebar /> : <></>}
      </div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
