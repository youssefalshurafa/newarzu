import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  customers: false,
  employees: false,
  orders: false,
  products: false,
  charts: false,
};

export const ContextProvider = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);
  const [orders, setOrders] = useState([]);
  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  const [screenSize, setScreenSize] = useState(undefined);
  return (
    <StateContext.Provider
      value={{
        isActiveMenu,
        setIsActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        setScreenSize,
        screenSize,
        orders,
        setOrders,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
