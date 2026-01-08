// import React from "react";
import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { products } from "../data/mockData";
import S1 from "../assets/slider1.png";
import S2 from "../assets/slider2.png";
import S3 from "../assets/slider3.png";

const Home = () => {
  const [carouselWidth, setCarouselWidth] = useState("80%"); // Default width
  const carouselRef = useRef(null);

  //to make it dynamic
  useEffect(() => {
    const updateCarouselWidth = () => {
      if (window.innerWidth <= 768) {
        setCarouselWidth("100%"); // For mobile screens
      } else {
        setCarouselWidth("80%"); // For larger screens
      }
    };

    updateCarouselWidth(); // update when loaded

    window.addEventListener("resize", updateCarouselWidth); // Update when window resize

    return () => {
      window.removeEventListener("resize", updateCarouselWidth); 
    };
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <Carousel
        ref={carouselRef}
        showThumbs={false} //thumbnail images
        infiniteLoop={true} //loop
        autoPlay={true} //automatic
        interval={3000} //time in millisecond
        showStatus={false} //number in top right
        dynamicHeight={true} //adjust according to height
        stopOnHover={true} //onmouse stops
        style={{ width: carouselWidth }} // Dynamically set the width of the carousel
      >
        <div className="slider-item">
          <Link to="/products?category=string" className="product-card-link">
            <img src={S3} alt="Guitar" />
            <div className="slider-content-left">
            </div>
          </Link>
        </div>
        <div className="slider-item">
          <Link to="/products?category=bass" className="product-card-link">
            <img src={S1} alt="Classical" />
            <div className="slider-content-right">
            </div>
          </Link>
        </div>
        <div className="slider-item">
          <Link to="/products?category=percussion" className="product-card-link">
            <img src={S2} alt="Band" />
            <div className="slider-content-right">
            </div>
          </Link>
        </div>
      </Carousel>

      {/* Featured Products */}
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <Link to="/products/1">
              <img
                src="https://media.istockphoto.com/id/1153864839/photo/guitar-tabla-and-cajon-musical-instruments.jpg?s=612x612&w=0&k=20&c=3MZDfbQPBrUJBY2T5nQHL5k-DpDc3Qkg-MKlH6gloUU="
                alt="Product 1"
              />
              <p>Tabla</p>
            </Link>
          </div>
          <div className="product-card">
            <Link to="/products/2">
              <img
                src="https://divineechoes.in/wp-content/uploads/2023/09/Sitar-Image-jpeg.webp"
                alt="Product 2"
              />
              <p>Sitar</p>
            </Link>
          </div>
          <div className="product-card">
            <Link to="/products/3">
              <img
                src="https://media.istockphoto.com/id/654006578/photo/acoustic-guitar-on-a-black-background-with-copy-space.jpg?s=612x612&w=0&k=20&c=JTvQrX4fuRoa0eYvUhs4mukXOXnHTJHMWa6ASbkqMUg="
                alt="Product 3"
              />
              <p>Guitar</p>
            </Link>
          </div>
          <div className="product-card">
            <Link to="/products/4">
              <img
                src="https://4.imimg.com/data4/VL/IQ/MY-2586103/white-harmonium-500x500.jpg"
                alt="Product 4"
              />
              <p>Harmonium</p>
            </Link>
          </div>
          <div className="product-card">
            <Link to="/products/5">
              <img
                src="https://i.pinimg.com/474x/e6/50/87/e650870e3f0f017c10c76dbb13875ee9.jpg"
                alt="Product 5"
              />
              <p>Veena</p>
            </Link>
          </div>
          <div className="product-card">
            <Link to="/products/6">
              <img
                src="https://burst.shopifycdn.com/photos/fiddle-or-violin-on-black.jpg?exif=0&iptc=0"
                alt="Product 6"
              />
              <p>Violin</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;