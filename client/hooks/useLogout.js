import axios from '@/pages/api/axios';
import Cookies from 'js-cookie';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    Cookies.remove('username');
    Cookies.remove('admin');
    Cookies.remove('editor');
    Cookies.remove('user');
    try {
      const response = await axios('/logout', {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
