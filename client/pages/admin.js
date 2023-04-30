import AdminNavbar from '@/components/adminFiles/adminNavbar';
import AdminSidebar from '@/components/adminSidebar';
import AdminProducts from '@/pages/adminProducts';
import { useStateContext } from '@/context/ContextProvider';
import Customers from '@/pages/customers';
import AdminOrders from '@/pages/adminOrders';

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
        <div className="absolute top-12">
          {isClicked.orders && (
            <div className="">
              <AdminOrders />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
