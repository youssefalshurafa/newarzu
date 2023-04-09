import Link from 'next/link';
import React, { useEffect } from 'react';

function CategorySection(props) {
  const selectedProducts = props.products.reduce((acc, curr) => {
    const foundProduct = acc.find((p) => p.category === curr.category);
    if (!foundProduct) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <div>
      <div className="flex justify-center  mt-2">
        <h1 className=" font-poppins font-semibold text-xl"> By Category </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 p-1 gap-2 font-poppins font-semibold ">
        {selectedProducts?.map((product, i) => (
          <Link key={i} href={`/category/${product.category}`}>
            <div className="relative  h-full w-full overflow-hidden shadow-lg rounded-md">
              <img src={product.thumbnail.url} alt="" />
              <p className="absolute bottom-1 left-1 text-xs  font-poppins">
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
