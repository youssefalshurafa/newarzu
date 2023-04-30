import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [data, setData] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth, data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
