import AdminNavbar from '@/components/adminNavbar';
import AdminSidebar from '@/components/adminSidebar';
import AdminProducts from '@/components/adminProducts';
import { useStateContext } from '@/context/ContextProvider';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useLogout from '@/hooks/useLogout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Admin = () => {
  const { isActiveMenu, isClicked } = useStateContext();

  const [users, setUsers] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });

        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
        await logout();
        router.push('/login');
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);
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
      </div>
    </div>
  );
};

export default Admin;
