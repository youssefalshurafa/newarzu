import { useStateContext } from '@/context/ContextProvider';
import { applyPagination } from '@/utils/apply-pagination';
import { useMemo } from 'react';

const UseOrders = () => {
  const { orders } = useStateContext();

  const ordersPage = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(orders, page, rowsPerPage);
    }, [page, rowsPerPage]);
  };

  return ordersPage;
};

export default UseOrders;
