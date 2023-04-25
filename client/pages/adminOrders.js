import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useEffect, useMemo, useState, useCallback } from 'react';
import Layout from '../components/layout';
import { CiUser, CiLocationOn, CiPhone, CiSearch } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { toast, Toaster } from 'react-hot-toast';
import { useStateContext } from '@/context/ContextProvider';
import { Card, CardContent, TablePagination } from '@mui/material';
import { useSelection } from '@/hooks/useSelection';
import OrdersTable from '@/components/ordersTable';
import Link from 'next/link';

const useOrdersInv = (orders) => {
  return useMemo(() => {
    return orders.map((order) => order.invoiceNumber);
  }, [orders]);
};
const AdminOrders = () => {
  const [orderId, setOrderId] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const { screenSize, orders, setOrders } = useStateContext();
  const [dotsClicked, setDotsClicked] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [theOrders, setTheOrders] = useState([]);
  const orderIds = useOrdersInv(theOrders);
  const orderSelection = useSelection(orderIds);
  const count = orders.length;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.phone.includes(searchTerm)
      )
    );
  }, [searchTerm]);
  const handleDots = (order) => {
    setOrderId(order?.invoiceNumber);
    setDotsClicked(dotsClicked === order?._id ? null : order?._id);
    orderSelection.handleDeselectAll();
    orderSelection.handleSelectOne(order?.invoiceNumber);
  };

  const setTheOrdersHandler = () => {
    setTheOrders(
      filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };
  useMemo(() => {
    setTheOrdersHandler();
  }, [orders, filteredOrders, page, rowsPerPage]);

  console.log(filteredOrders);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleDelete = () => {
    try {
      orderSelection?.selected?.map(async (order) => {
        return await axiosPrivate.delete('/deleteOrder', {
          data: { invNum: order },
        });
      });
      handleDots();
      toast.success(`Deleted `);
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await axiosPrivate.get('/getAllOrders');
      const allOrders = [...response.data].reverse();
      setOrders(allOrders);
      setTheOrdersHandler();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  const handleShipped = async () => {
    try {
      await axiosPrivate.put('/editOrder', {
        invNum: orderId,
        shipped: true,
      });
      setDotsClicked(false);
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const handleNotShipped = async () => {
    try {
      await axiosPrivate.put('/editOrder', {
        invNum: orderId,
        shipped: false,
      });
      setDotsClicked(false);
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Layout>
      <div>
        <Toaster position="top-center"></Toaster>
        {orderSelection.selected.length >= 1 ? (
          <div className="flex  ml-6 my-2">
            <div className="shadow-md border p-1  font-poppins">
              {orderSelection.selected.length} Marked
            </div>
            <button
              onClick={handleDelete}
              className=" shadow-md border p-1  font-poppins text-red-500"
            >
              Delete
            </button>
          </div>
        ) : (
          <h1 className=" font-poppins ml-6 my-2 text-lg">{count} Orders</h1>
        )}
        <div className=" w-full space-y-6 mx-5 my-5 ">
          <div className="relative flex">
            <input
              onChange={handleSearch}
              className=" border mx-auto rounded-md w-full p-2"
              type="search"
              placeholder="    Search Orders by Customer Name or by Phone"
            />
            <span className=" absolute right-2 top-2">
              <CiSearch size={22} />
            </span>
          </div>

          {screenSize <= 1000 ? (
            <div>
              {theOrders.map((order) => (
                <Card key={order.invoiceNumber} className="hover:bg-gray-100 ">
                  <CardContent>
                    <div className="relative font-poppins space-y-2 ">
                      <span
                        onClick={() => handleDots(order)}
                        className=" absolute right-2 bottom-2 cursor-pointer"
                      >
                        <BsThreeDots size={22} />
                      </span>
                      {dotsClicked === order._id && (
                        <div className=" absolute right-10 bottom-0 space-y-2  shadow-md bg-white p-3 rounded-md">
                          <Link href={`/order/${order.customerName}`}>
                            <p className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                              Show Order
                            </p>
                          </Link>
                          {order.shipped ? (
                            <p
                              onClick={handleNotShipped}
                              className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer"
                            >
                              Mark as Not Shipped
                            </p>
                          ) : (
                            <p
                              onClick={handleShipped}
                              className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer"
                            >
                              Mark as Shipped
                            </p>
                          )}

                          <p
                            onClick={() => handleDelete()}
                            className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer  text-red-500"
                          >
                            Delete Order
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <p className=" text-cyan-500">{order.invoiceNumber}</p>
                        <div>
                          <p className=" text-gray-400 ">
                            {order.date.slice(0, 10)}
                          </p>
                          <p className=" text-gray-400 absolute right-0">
                            {order.date.slice(11, 16)}
                          </p>
                        </div>
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
              <TablePagination
                component="div"
                count={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </div>
          ) : (
            <OrdersTable
              count={count}
              theOrders={theOrders}
              onSelectAll={orderSelection.handleSelectAll}
              onDeselectAll={orderSelection.handleDeselectAll}
              selected={orderSelection.selected}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectOne={orderSelection.handleSelectOne}
              onDeselectOne={orderSelection.handleDeselectOne}
              dotsClicked={dotsClicked}
              handleDots={handleDots}
              handleNotShipped={handleNotShipped}
              handleShipped={handleShipped}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
