import Layout from '@/components/adminFiles/layout';
import React from 'react';

const assets = () => {
  return (
    <>
      <Layout>
        <div className=" ml-5 mt-5 font-poppins space-y-4">
          <div>
            <h1 className=" font-semibold">Change Homepage Carousels</h1>
            <div className="mt-2">
              <input type="file" multiple />
            </div>
          </div>
          <div>
            <h1 className=" font-semibold">Change Banner</h1>
            <div className="mt-2">
              <input type="file" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default assets;
