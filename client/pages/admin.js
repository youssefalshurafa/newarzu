import AdminNavbar from '@/components/adminNavbar';
import AdminSidebar from '@/components/adminSidebar';
import AdminProducts from '@/components/adminProducts';
import { useStateContext } from '@/context/ContextProvider';
import Customers from '@/components/customers';

const Admin = () => {
  const { isActiveMenu, isClicked } = useStateContext();

  return (
    <div>
      <div className="fixed w-full z-20 ">
        <AdminNavbar />
      </div>
      <div className="flex">
        <div className="fixed left-0 z-10 mt-4">
          {isActiveMenu ? <AdminSidebar /> : <></>}
        </div>
        <div className="absolute top-12">
          {isClicked.products && (
            <div className="">
              <AdminProducts />
            </div>
          )}
        </div>
        <div className="absolute top-12">
          {isClicked.customers && (
            <div className="">
              <Customers />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
