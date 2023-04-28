import NavBar from './nav';
import DropDown from './dropDown';
import { useState } from 'react';

const MainLayout = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const showBar = () => setVisible(!visible);
  return (
    <>
      <div className=" fixed top-0 z-10 w-full">
        <NavBar showBar={showBar} />
      </div>
      {visible ? (
        <div className=" fixed overscroll-contain bg-opacity-80 bg-white h-screen  top-0 z-20 min-w-full">
          <DropDown showBar={showBar} />
        </div>
      ) : (
        <></>
      )}
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
