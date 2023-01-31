import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 py-4 ">
        <div>
          <p className=" px-1 text-center font-poppins font-semibold text-lg">
            Customer Care
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin space-y-1">
            <p className=" text-xs">Return & Exchang</p>
            <p className=" text-xs">Fabric care</p>
            <p className=" text-xs">Order Tracking</p>
          </div>
        </div>
        <div>
          <p className="px-1 text-center font-poppins font-semibold text-lg">
            Our Brand
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin font-xs space-y-1">
            <p className=" text-xs">About Us</p>
            <p className=" text-xs">Gift Cards</p>
            <p className=" text-xs">Career</p>
          </div>
        </div>
        <div>
          <p className="px-1 text-center font-poppins font-semibold text-lg">
            Connect
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin space-y-1">
            <p className=" text-xs">Contact us</p>
            <p className=" text-xs">Wholesale</p>
          </div>
        </div>
        <div>
          <p className="px-1 text-center font-poppins font-semibold text-lg">
            Support
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin font-xs space-y-1">
            <p className=" text-xs">Privacy Policy</p>
            <p className=" text-xs">Terms Of Use</p>
            <p className=" text-xs">Shipping Policy</p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-100">
        <p className="relative pl-4 text-xs font-poppins w-full bg-gray-100">
          © 2023 ARZU. ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}

export default Footer;
