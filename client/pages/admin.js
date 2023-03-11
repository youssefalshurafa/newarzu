import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useLogout from '@/hooks/useLogout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Admin = () => {
  const { auth } = useAuth();
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
      <h1>admin page</h1>
      <div>
        {users?.length ? (
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user?.username}</li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
