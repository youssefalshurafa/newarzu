import Layout from '@/components/layout';
import { useStateContext } from '@/context/ContextProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const OrderPage = () => {
  const { query } = useRouter();
  const { order } = query;
  const { screenSize, orders, setOrders } = useStateContext();

  const theOrder = orders.find((x) => x.customerName == order);
  console.log(theOrder);
  return (
    <Layout>
      <Link href={'/adminOrders'}>
        <button className="space-x-1 items-center mb-4 flex border border-solid font-poppins border-neutral-700 px-2 hover:bg-neutral-700 hover:text-white">
          Back to Orders
        </button>
      </Link>
      <div>{theOrder?.customerName}</div>
    </Layout>
  );
};

export default OrderPage;
