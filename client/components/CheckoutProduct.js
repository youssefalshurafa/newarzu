import {
  selectQuantity,
  removeFromBag,
  addToBag,
  decrementFromBag,
} from '@/slices/bagSlice';
import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

export default function CheckoutProduct({
  id,
  thumbnail,
  title,
  price,
  cartQuantity,
}) {
  const dispatch = useDispatch();
  const addToBagHandler = () => {
    const product = {
      id,
      title,
      thumbnail,
      price,
      cartQuantity,
    };
    dispatch(addToBag(product));
  };
  const decrementHandler = () => {
    const product = {
      id,
      title,
      thumbnail,
      price,
      cartQuantity,
    };
    dispatch(decrementFromBag(product));
  };
  return (
    <div className=" grid grid-cols-3 md:grid md:grid-cols-6 w-full  border-b">
      <div className=" col-span-1 md:col-span-1 p-1  mx-auto">
        <img width={100} height={100} src={thumbnail} alt="" />
      </div>
      <div className=" col-span-2 md:col-span-3 flex mx-2 md:mx-5  justify-between items-center">
        <div className="md:flex md:space-x-8 font-poppins">
          <p>{title}</p>
          <p>${price}</p>
        </div>
        <div className="flex space-x-3 items-center">
          <div
            onClick={() => dispatch(removeFromBag({ id }))}
            className="mr-2 cursor-pointer"
          >
            <RiDeleteBinLine />
          </div>
          <div className=" flex space-x-3 font-poppins border p-2 shadow-md">
            <span className=" cursor-pointer" onClick={decrementHandler}>
              -
            </span>
            <p className=" cursor-default">{cartQuantity}</p>
            <span className=" cursor-pointer" onClick={addToBagHandler}>
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
