import React from 'react';

const CreateProduct = () => {
  return (
    <div>
      <h1>Create Product</h1>
      <form className="space-y-5">
        <label htmlFor="title">Title:</label>
        <input type="text" placeholder="enter name" />
        <br />
        <label htmlFor="title">Desc:</label>
        <input type="text" placeholder="enter name" />
        <br />

        <label htmlFor="title">Price:</label>
        <input type="text" placeholder="enter name" />
        <br />
        <label htmlFor="file">image:</label>
        <input type="file" placeholder="enter name" />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateProduct;
