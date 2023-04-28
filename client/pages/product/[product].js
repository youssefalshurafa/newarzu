import DropDown from '@/components/dropDown';
import Footer from '@/components/footer';
import NavBar from '@/components/nav';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { addToBag } from '@/slices/bagSlice';
import dynamic from 'next/dynamic';
import axios from '../api/axios';
import MainLayout from '@/components/mainLayout';

function ProductPage() {
  const { query } = useRouter();
  const { product } = query;
  const [products, setProducts] = useState([]);
  const getAllproducts = async () => {
    const response = await axios.get('/getAllProducts');

    setProducts(response.data);
  };
  useEffect(() => {
    getAllproducts();
  }, []);
  const productName = products.find((x) => x.title == product);
  const [size, setSize] = useState('');

  const dispatch = useDispatch();
  const updatedProduct = { ...productName, size };

  return (
    <>
      <Head>
        <title>{`${product} | Arzu`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <div className="min-h-screen flex flex-col justify-between">
          <div className="relative top-8 pb-7 md:grid grid-cols-2 container mx-auto">
            <div>
              <Carousel showArrows={false} showStatus={false} showThumbs={true}>
                {productName?.images?.map((image) => (
                  <div>
                    <img src={image.url} alt="" />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className=" font-poppins pt-5 pl-5 text-xs">
              <p className="text-sm ">{productName?.title}</p>
              <p>${productName?.price}</p>
              <p className="pt-2">{`Size: ${size}`}</p>
              <div className="flex  space-x-4  pt-2">
                <button
                  onClick={() => setSize('S')}
                  className={
                    size == 'S'
                      ? 'bg-gray-800 text-white w-12 h-5 rounded-md'
                      : 'bg-gray-200 w-12 h-5 rounded-md hover:bg-gray-800 hover:text-white'
                  }
                >
                  S
                </button>
                <button
                  onClick={() => setSize('M')}
                  className={
                    size == 'M'
                      ? 'bg-gray-800 text-white w-12 h-5 rounded-md'
                      : 'bg-gray-200 w-12 h-5 rounded-md hover:bg-gray-800 hover:text-white'
                  }
                >
                  M
                </button>
                <button
                  onClick={() => setSize('L')}
                  className={
                    size == 'L'
                      ? 'bg-gray-800 text-white w-12 h-5 rounded-md'
                      : 'bg-gray-200 w-12 h-5 rounded-md hover:bg-gray-800 hover:text-white'
                  }
                >
                  L
                </button>
                <button
                  onClick={() => setSize('XL')}
                  className={
                    size == 'XL'
                      ? 'bg-gray-800 text-white w-12 h-5 rounded-md'
                      : 'bg-gray-200 w-12 h-5 rounded-md hover:bg-gray-800 hover:text-white'
                  }
                >
                  XL
                </button>
              </div>
              <div>
                <button
                  onClick={() => dispatch(addToBag(updatedProduct))}
                  className=" text-center w-full  h-8 bg-black text-white mt-4 rounded-sm"
                >
                  ADD TO BAG
                </button>
              </div>
              <div className="mt-5">
                <p className=" font-serif">Description</p>
                <p className="pt-4 font-xs font-extralight font-sans">
                  {productName?.description}
                </p>
              </div>
              <div className="mt-5">
                <p className=" font-serif">Material</p>
                <p className="pt-4 font-xs font-extralight font-sans">
                  {productName?.material}
                </p>
              </div>
              <Link href={`/category/${productName?.category}`}>
                <div className="mt-5">
                  <button className="bg-gray-200 h-8 w-full cursor-pointer">
                    Back To Products
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <Footer />
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default dynamic(() => Promise.resolve(ProductPage), { ssr: false });
