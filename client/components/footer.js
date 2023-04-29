import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 h-max">
      <div className="grid grid-cols-2 md:grid-cols-4 pt-4">
        <div>
          <p className=" px-1 text-center font-poppins font-semibold text-base">
            CUSTOMER CARE
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin space-y-3">
            <p className=" text-xs">Return & Exchange</p>
            <p className=" text-xs">Fabric care</p>
            <p className=" text-xs">Order Tracking</p>
          </div>
        </div>
        <div>
          <p className="px-1 text-center font-poppins font-semibold text-base">
            OUR BRAND
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin font-xs space-y-3">
            <p className=" text-xs">About Us</p>
            <p className=" text-xs">Gift Cards</p>
            <p className=" text-xs">Career</p>
          </div>
        </div>
        <div>
          <p className="px-1 pt-4 md:pt-0 text-center font-poppins font-semibold text-base">
            CONNECT
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin space-y-3">
            <p className=" text-xs">Contact us</p>
            <p className=" text-xs">Wholesale</p>
          </div>
        </div>
        <div>
          <p className="px-1 pt-4 md:pt-0 text-center font-poppins font-semibold text-base">
            SUPPORT
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin font-xs space-y-3">
            <p className=" text-xs">Privacy Policy</p>
            <p className=" text-xs">Terms Of Use</p>
            <p className=" text-xs">Shipping Policy</p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-100 pt-12">
        <p className="relative pl-4 text-xs font-poppins w-full bg-gray-100">
          © 2023 ARZU. ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}

export default Footer;
