import Link from 'next/link';

function CategorySection(props) {
  const selectedProducts = props.products.reduce((acc, curr) => {
    const foundProduct = acc.find((p) => p.category === curr.category);
    if (!foundProduct) {
      acc.push(curr);
    }
    return acc;
  }, []);
  console.log(selectedProducts);

  return (
    <div>
      <div className="flex justify-center  mt-2">
        <h1 className=" font-poppins font-semibold my-4 text-3xl underline">
          {' '}
          By Category{' '}
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 p-1 gap-2 font-poppins font-semibold ">
        {selectedProducts?.map((product, i) => (
          <Link key={i} href={`/category/${product.category}`}>
            <div className="relative  h-128 w-full overflow-hidden shadow-lg rounded-md">
              <img src={product.thumbnail.url} alt="" />
              <p className="absolute top-2 left-2 text-xs  font-poppins">
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
