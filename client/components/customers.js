import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useLogout from '@/hooks/useLogout';
import { useRouter } from 'next/router';
import React from 'react';

import { useState, useEffect } from 'react';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const logout = useLogout();
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
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
      {users?.map((user) => (
        <div key={user._id}>
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Customers;
