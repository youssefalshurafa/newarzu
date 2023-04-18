import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useEffect, useMemo, useState, useCallback } from 'react';
import Layout from '../components/layout';
import { CiUser, CiLocationOn, CiPhone, CiSearch } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { toast, Toaster } from 'react-hot-toast';
import { useStateContext } from '@/context/ContextProvider';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { applyPagination } from '@/utils/apply-pagination';
import { Scrollbar } from '@/components/scrollbar';
import useOrders from '@/hooks/useOrders';

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
  const ordersPage = useOrders();
  const theOrders = ordersPage(page, rowsPerPage);
  const orderIds = useOrdersInv(theOrders);
  const count = orders.length;

  const handleDots = (order) => {
    setOrderId(order?.invoiceNumber);
    setDotsClicked(dotsClicked === order?._id ? null : order?._id);
  };
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete('/deleteOrder', { data: { invNum: orderId } });
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
      setOrders(response.data);
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

  return (
    <Layout>
      <div>
        <Toaster position="top-center"></Toaster>
        <h1 className=" font-poppins m-3 text-lg">{count} Orders</h1>

        <div className=" w-full space-y-6 mx-5 my-5 ">
          <div className="relative flex">
            <input
              className=" border mx-auto rounded-md w-full p-2"
              type="search"
              placeholder="    Search Orders"
            />
            <span className=" absolute right-2 top-2">
              <CiSearch size={22} />
            </span>
          </div>

          {screenSize <= 900 ? (
            <div>
              {theOrders.map((order) => (
                <Card className="hover:bg-gray-100 ">
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
                          <p className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                            Show Order
                          </p>
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

                          <p className=" hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                            Edit Order
                          </p>
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
            <Card>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Invoice</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {theOrders.map((customer) => {
                      return (
                        <TableRow hover key={customer._id}>
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <Stack
                              alignItems="center"
                              direction="row"
                              spacing={2}
                            >
                              <Typography variant="subtitle2">
                                {customer.customerName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{customer.invoiceNumber}</TableCell>
                          <TableCell>{customer.address}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>
                            {customer.shipped ? 'Shipped' : 'Not Shipped'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
              <TablePagination
                component="div"
                count={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
