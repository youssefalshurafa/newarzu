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
import Link from 'next/link';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

const OrdersTable = (props) => {
  const {
    count = 0,

    theOrders = [],
    onSelectAll,
    onSelectOne,
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    selected = [],
    page = 0,
    rowsPerPage = 0,
    dotsClicked,
    handleDots,
    handleNotShipped,
    handleShipped,
  } = props;

  const selectedSome =
    selected.length > 0 && selected.length < theOrders.length;

  const selectedAll =
    theOrders.length > 0 && selected.length === theOrders.length;

  return (
    <>
      <Card>
        <Box sx={{ minWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell className=" font-poppins font-semibold">
                  CUSTOMER
                </TableCell>
                <TableCell className=" font-poppins font-semibold">
                  INVOICE
                </TableCell>
                <TableCell className=" font-poppins font-semibold">
                  DATE
                </TableCell>
                <TableCell className=" font-poppins font-semibold">
                  ADDRESS
                </TableCell>
                <TableCell className=" font-poppins font-semibold">
                  PHONE
                </TableCell>
                <TableCell className=" font-poppins font-semibold">
                  STATUS
                </TableCell>
                <TableCell className=" font-poppins font-semibold">
                  SETTINGS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {theOrders.map((order) => {
                const isSelected = selected.includes(order.invoiceNumber);
                const index = order.address.lastIndexOf(',');
                const slicedAddress = order.address.slice(index + 1);

                return (
                  <TableRow hover key={order._id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(order.invoiceNumber);
                          } else {
                            onDeselectOne?.(order.invoiceNumber);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography
                          className=" font-poppins"
                          variant="subtitle2"
                        >
                          {order.customerName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell className=" font-poppins">
                      {order.invoiceNumber}
                    </TableCell>
                    <TableCell className=" font-poppins">
                      <p>{order.date.slice(5, 10)}</p>
                      <p> {order.date.slice(11, 16)}</p>
                    </TableCell>
                    <TableCell className=" font-poppins">
                      {slicedAddress}
                    </TableCell>
                    <TableCell className=" font-poppins">
                      {order.phone}
                    </TableCell>
                    <TableCell>
                      <p
                        className={
                          order.shipped
                            ? ' text-green-400 w-max rounded-md text-sm font-poppins'
                            : ' text-purple-400 w-max rounded-md text-sm font-poppins'
                        }
                      >
                        {order.shipped ? 'Shipped' : 'Not Shipped'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span
                        onClick={() => handleDots(order)}
                        className="cursor-pointer"
                      >
                        <BsThreeDots size={22} />
                      </span>
                      {dotsClicked === order._id && (
                        <div className="absolute w-max z-20  space-y-2  shadow-md bg-white p-3 rounded-md">
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
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

export default OrdersTable;
