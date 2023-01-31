import React from 'react';

function CategorySection() {
  return (
    <div>
      <div className="flex justify-center">
        <h1 className=" font-poppins font-semibold text-xl"> By Category </h1>
      </div>
      <div className="grid grid-cols-2 lg:flex">
        <div className="p-1 ">
          <img
            height={1500}
            src="https://naploungewear.com/wp-content/uploads/2023/01/nap_basic_20230118.jpg"
            alt=""
          />
          <p className=" text-center font-semibold font-poppins p-1">
            Ready to Wear
          </p>
        </div>
        <div className=" p-1">
          <img
            src="https://naploungewear.com/wp-content/uploads/2023/01/homewear_20230118.jpg"
            alt=""
          />
          <p className=" text-center font-semibold font-poppins p-1">
            Home Wear
          </p>
        </div>

        <div className=" p-1 ">
          <img
            src="https://naploungewear.com/wp-content/uploads/2023/01/sleepwear_20230118.jpg"
            alt=""
          />
          <p className=" text-center font-semibold font-poppins p-1">
            Sleep Wear
          </p>
        </div>

        <div className=" p-1">
          <img
            src="https://naploungewear.com/wp-content/uploads/2023/01/ready_to_wear_20230118.jpg"
            alt=""
          />
          <p className=" text-center font-semibold font-poppins p-1">
            Knit Wear
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
