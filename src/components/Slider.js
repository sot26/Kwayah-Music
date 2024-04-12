import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

const Slider = () => {
  const [news, setNews] = useState([]);
  const docRef = collection(db, "news");

  useEffect(() => {
    const getNews = async () => {
      const newsSnapshot = await getDocs(docRef);
      const newsData = newsSnapshot.docs.slice(0, 9).map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNews(newsData);
    };
    getNews();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newSlide = isFirstSlide ? news.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const nextSlide = () => {
    const isLastSlide = currentSlide === news.length - 1;
    const newSlide = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="w-full">
      <div className=" h-[50vh] w-full m-auto pb-12  relative group ">
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-0 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft size={30} onClick={prevSlide} />
        </div>
        <div className="w-full h-full">
          <div
            style={{
              backgroundImage: `url(${
                news.length > 0 && news[currentSlide]
                  ? news[currentSlide].imageURL
                  : ""
              })`,
            }}
            className="bg-cover bg-center h-full w-full duration-500 ease-in-out "
          ></div>

          <div className="flex absolute text-white bottom-[40px] items-center justify-center w-full">
            <div className="p-[10px] md:p-[30px] flex flex-col items-center justify-center bg w-full">
              <p className="text-[15px] md:text-[20px]">
                {news.length > 0 && news[currentSlide].title}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-0 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight size={30} onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
