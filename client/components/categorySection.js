import Link from 'next/link';
import React from 'react';

function CategorySection(props) {
  console.log(props.products);
  return (
    <div>
      <div className="flex justify-center">
        <h1 className=" font-poppins font-semibold text-xl"> By Category </h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 p-1 space-x-1 ">
        {props.products?.map((product, i) => (
          <Link key={i} href={`/category/${product.category}`}>
            <div>
              <img src={product.thumbnail.url} alt="" />
              <p className=" text-xs text-center font-poppins">
                {product.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
