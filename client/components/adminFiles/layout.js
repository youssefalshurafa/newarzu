import AdminSidebar from '../adminFiles/adminSidebar';
import AdminNavbar from '../adminFiles/adminNavbar';
import { useStateContext } from '../../context/ContextProvider';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  const {
    isActiveMenu,
    setIsActiveMenu,
    isClicked,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setIsActiveMenu(false);
    } else {
      setIsActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <>
      <div className="fixed w-full z-20">
        <AdminNavbar />
      </div>
      <div>
        <div
          className={`fixed  left-0 z-10 mt-4 ${
            isActiveMenu
              ? ' transform translate-x-0 duration-500'
              : 'transform  -translate-x-full duration-500'
          }`}
        >
          <AdminSidebar />
        </div>
        <div
          className={`absolute top-14   ${
            isActiveMenu
              ? ' transform translate-x-0 duration-500 ml-60'
              : 'transform  duration-500'
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
