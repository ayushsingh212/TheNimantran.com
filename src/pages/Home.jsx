import ProductCard from "../components/ProductCard";
import { Link, NavLink } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PopularCards from "../components/PopularCards";
import CardPage from "./CardPage";

import weddingImg from "../assets/wedding.png";
import businessImg from "../assets/wedding.png";
import birthdayImg from "../assets/wedding.png";
import babyShowerImg from "../assets/wedding.png";
import festiveImg from "../assets/wedding.png";
import corporate1 from "../assets/wedding.png";
import corporate2 from "../assets/wedding.png";
import corporate3 from "../assets/wedding.png";
import OurServices from "../components/OurServices";
import WhyChooseUs from "../components/WhyChooseUs";
import WelcomeBanner from "../components/WelcomeBanner";
import TrendingCards from "../components/TrendingCards";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};


const images = [
  {
    id: 1,
    link: "https://img.freepik.com/free-vector/traditional-happy-diwali-occasion-banner-indian-style_1017-40410.jpg",
  },
  {
    id: 2,
    link: "https://static.vecteezy.com/system/resources/previews/024/715/548/large_2x/modern-printing-press-creates-colorful-documents-indoors-generated-by-ai-photo.jpg",
  },
  {
    id: 3,
    link: "https://img.freepik.com/free-photo/modern-manufacturing-equipment-futuristic-factory-generated-by-ai_188544-18464.jpg",
  },
];

const categories = [
  { title: "Wedding", price: "₹170", image: weddingImg, category: "wedding" },
  { title: "Business Inauguration", price: "₹180", image: businessImg, category: "business-inauguration" },
  { title: "Birthday", price: "₹120", image: birthdayImg, category: "birthday" },
  { title: "Baby Shower", price: "₹180", image: babyShowerImg, category: "baby-shower" },
  { title: "Festive Greetings", price: "₹100", image: festiveImg, to: "festive-greetings" },
  { title: "Corporate", price: "₹150", image: corporate1, category: "corporate" },

];


function Home() {

  const [category, setCategory] = useState('wedding')


  return (
    <div className="space-y-10 px-4 pt-8 font-serif bg-[#f4f0d4] text-gray-800 relative">

      <WelcomeBanner />

      <Carousel
        swipeable
        draggable
        responsive={responsive}
        infinite
        autoPlay={false}
        autoPlaySpeed={2500}
        keyBoardControl
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
      >
        <div className="w-full h-[294.5px] md:h-[330px] overflow-hidden border-[2vw] md:border-[1vw] border-[#E9A319] rounded-xl">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.link}
              alt={`Slide ${img.id}`}
              className="w-full h-full object-cover object-[17.5%_0%] md:object-[center]"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          ))}
        </div>
      </Carousel>







      <section className="px-4 md:px-10 ">
        <h2 className="text-4xl md:text-5xl font-semibold text-center md:mb-[2.4vw] mb-[9vw]  text-heading underline decoration-[#F3C623] decoration-[6px]">Our Categories</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((card, index) => (
            <button
              onClick={() =>
                setCategory(card.category)
              }
              key={index}
              className="md:w-[200px] md:h-[220px] w-[150px] h-auto pt-5 border-[3px] md:border-[2px] border-[#F3C623] rounded-xl flex flex-col items-center text-center bg-white rounded-lg hover:shadow-[5px_5px_9px_#F3C623]"
            >
              <div className="w-20 h-20 bg-purple-300 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:h-[5vw] h-[22vw] w-[12vw]  flex items-center justify-center">
                <h3 className="mt-2 text-xl font-semibold">{card.title}</h3>
              </div>

            </button>
          ))}
        </div>
      </section>

      <CardPage category={category} />





      <PopularCards />
      <TrendingCards />




      <OurServices />
      <WhyChooseUs />
    </div>
  );
}

export default Home;
