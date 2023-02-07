import DropDown from '@/components/dropDown';
import Footer from '@/components/footer';

import NavBar from '@/components/nav';
import { Card, CardContent } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import data from '../../lib/data.json';
export default function CategoryPage() {
  const { query } = useRouter();
  const { category } = query;
  const catName = data.filter((x) => x.category == category);
  !category ? <div>Category not Found</div> : <></>;
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = (key) => () => setIsHovered({ [key]: true });
  const onMouseLeave = (key) => () => setIsHovered({ [key]: false });
  const [visible, setVisible] = useState(false);
  const showBar = () => setVisible(!visible);
  return (
    <>
      <Head>
        <title>{`${catName.category} | Arzu`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-between">
        <div className=" fixed top-0 z-10 w-full">
          <NavBar showBar={showBar} />
        </div>
        {visible ? (
          <div className=" fixed overscroll-contain bg-opacity-80 bg-white h-screen  top-0 z-20 min-w-full">
            <DropDown showBar={showBar} />
          </div>
        ) : (
          <></>
        )}
        <div>
          <div className=" mx-auto max-w-6xl">
            <img
              src="https://img.freepik.com/free-vector/abstract-fashion-monsoon-sale-banner-offer-discount-business-background-free-vector_1340-22458.jpg?w=1480&t=st=1675275161~exp=1675275761~hmac=8b9735f9c9f2fc16c7cb4ff01279f82edcc54157de3682bf66a07aad0d43531a"
              alt=""
            />
          </div>
          <div className="  border-b">
            <h1 className=" text-center font-poppins font-bold pt-2">
              {category}
            </h1>
          </div>

          <div className="grid grid-cols-2 mx-auto max-w-4xl md:grid-cols-3 lg:grid-cols-4">
            {catName.map((product, key) => (
              <div key={key} className="w-full h-full">
                <CardContent>
                  <Link href={`/product/${product.title}`}>
                    <img
                      onMouseEnter={onMouseEnter(key)}
                      onMouseLeave={onMouseLeave(key)}
                      src={
                        isHovering[key] ? product.images[1] : product.thumbnail
                      }
                      alt=""
                    />
                  </Link>

                  <p className=" text-xs text-left font-poppins mt-2">
                    {product.title}
                  </p>
                  <p className=" text-xs font-semibold">${product.price}</p>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </>
  );
}
