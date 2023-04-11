import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
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
  console.log(orders);
  return (
    <div>
      <h1>Orders</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className=" bg-gray-800">
              <th className=" px-16 py-2">
                <span className=" text-gray-200">Customer</span>
              </th>
              <th className=" px-16 py-2">
                <span className=" text-gray-200">Address</span>
              </th>
              <th className=" px-16 py-2">
                <span className=" text-gray-200">Phone</span>
              </th>
              <th className=" px-16 py-2">
                <span className=" text-gray-200">Cart</span>
              </th>
              <th className=" px-16 py-2">
                <span className=" text-gray-200">Date</span>
              </th>
              <th className=" px-16 py-2">
                <span className=" text-gray-200">Invoice</span>
              </th>
              <th className=" px-16 py-2">
                <span className=" text-gray-200">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className=" bg-gray-50 text-center" key={order._id}>
                <td className="px-16 py-2 flex flex-row items-center">
                  <p className=" mt-2 font-semibold">{order.customerName}</p>
                </td>
                <td className="px-16 py-2">{order.address}</td>
                <td className="px-16 py-2">{order.phone}</td>
                <td className="px-16 py-2">
                  {order.items.map((item) => (
                    <div>
                      <p>{item?.title}</p>
                    </div>
                  ))}
                </td>
                <td className="px-16 py-2">{order.date.toLocaleString()}</td>
                <td className="px-16 py-2">{order.invoiceNumber}</td>
                <td className="px-16 py-2 flex justify-around gap-5">
                  {order.shipped ? 'Shipped' : 'Not Shipped'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
