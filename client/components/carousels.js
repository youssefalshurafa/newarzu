import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
function Carousels() {
  return (
    <div>
      <div className=" md:hidden">
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          interval={3000}
        >
          <div>
            <img src="https://naploungewear.com/wp-content/uploads/2022/09/belted-shawl-lapel-wool-coatmain0.jpg" />
          </div>
          <div>
            <img src="https://naploungewear.com/wp-content/uploads/2021/01/vg.jpg" />
          </div>
          <div>
            <img src="https://naploungewear.com/wp-content/uploads/2021/01/20210115nap02581.jpg" />
          </div>
        </Carousel>
      </div>
      <div className="hidden md:flex">
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          interval={3000}
        >
          <div>
            <img src="https://cdn.shopify.com/s/files/1/0094/2252/files/Malin-_-Goetz-Rogue0483-6x3_1.jpg?v=1670248710" />
          </div>
          <div>
            <img src="https://cdn.shopify.com/s/files/1/0094/2252/files/mens-main_3150b6b1-d414-48bb-b80a-f18066909fc4.png?v=1674768027" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Carousels;
