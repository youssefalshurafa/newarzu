import useAuth from '@/hooks/useAuth';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

function Profile() {
  const { auth } = useAuth();
  const { query } = useRouter();
  const { user } = query;
  !user ? <div>User not Found</div> : <></>;
  const [data, setData] = useState({});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('/user', {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        withCredentials: true,
      });
      setData(response.data);
      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      '/updateUser',
      {
        fullName: fullName,
        email: email,
        mobile: mobile,
      },
      {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        withCredentials: true,
      }
    );
  };

  return (
    <div>
      <h1>Profile Page</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full name: </label>
        <input
          type="text"
          defaultValue={data.fullName || ''}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          defaultValue={data.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="mobile">Mobile: </label>
        <input
          type="text"
          defaultValue={data.mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <br />
        <button>Update</button>
      </form>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
