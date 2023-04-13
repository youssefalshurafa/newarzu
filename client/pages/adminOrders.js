import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { CiUser, CiLocationOn, CiPhone, CiSearch } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { Card, CardContent } from '@mui/material';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const [dotsClicked, setDotsClicked] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllOrders = async () => {
      try {
        const response = await axiosPrivate.get('/getAllOrders', {
          signal: controller.signal,
        });

        isMounted && setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllOrders();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  return (
    <Layout>
      <div>
        <h1 className=" font-poppins m-3 text-lg">{orders.length} Orders</h1>

        <div className=" relative space-y-6 mx-5 my-5 ">
          <div className="flex">
            <input
              className=" border mx-auto rounded-md w-full p-2"
              type="search"
              placeholder="    Search Orders"
            />
            <span className=" absolute right-2 top-2">
              <CiSearch size={22} />
            </span>
          </div>

          {orders.map((order) => (
            <Card className="hover:bg-gray-100 ">
              <CardContent>
                <div className="relative font-poppins space-y-2 ">
                  <span
                    onClick={() => setDotsClicked(!dotsClicked)}
                    className=" absolute right-2 bottom-2 cursor-pointer"
                  >
                    <BsThreeDots size={22} />
                  </span>
                  {dotsClicked && (
                    <div className=" absolute right-10 bottom-0 space-y-2  shadow-md bg-white p-3 rounded-md">
                      <p className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                        Show Order
                      </p>
                      <p className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                        Mark as Shipped
                      </p>
                      <p className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                        Edit Order
                      </p>
                      <p className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer  text-red-500">
                        Delete Order
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <p className=" text-cyan-500">{order.invoiceNumber}</p>
                    <p className=" text-gray-400">{order.date}</p>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>
                      <CiUser size={18} />
                    </span>
                    <p className="text-lg font-semibold">
                      {order.customerName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>
                      <CiLocationOn size={18} />
                    </span>
                    <p className="text-sm ">{order.address}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>
                      <CiPhone size={18} />
                    </span>
                    <p className="text-sm ">{order.phone}</p>
                  </div>
                  <div
                    className={
                      order.shipped
                        ? ' bg-green-200 w-max p-1 rounded-md text-sm'
                        : ' bg-purple-200 w-max p-1 rounded-md text-sm'
                    }
                  >
                    {order.shipped ? 'Shipped' : 'Not Shipped'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
