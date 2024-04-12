import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { Link } from "react-router-dom";

const ViewNews = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10); // Change this value to adjust the number of news per page
  const [searchTerm, setSearchTerm] = useState("");
  const docRef = collection(db, "news");

  useEffect(() => {
    const getNews = async () => {
      const newsSnapshot = await getDocs(docRef);
      const newsData = newsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNews(newsData);
    };
    getNews();
  }, []);

  // Pagination Logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  return (
    <div className="w-full min-h-[100vh] flex items-center flex-col">
      <div className="my-4">
        <input
          type="text"
          placeholder="Search news by title"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
      </div>
      <div className="lg:min-w-[1200px]">
        {currentNews.length === 0 ? (
          <div className="flex justify-center items-center w-full min-h-[100vh]">
            <div className="loading-wave ">
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
            </div>
          </div>
        ) : (
          currentNews.map((ne, index) => {
            const { id, imageURL, title, description } = ne;
            return (
              <div key={index}>
                <Link to={`/view-news/${id}`}>
                  <div className="flex flex-row border border-gray-200 bg-[#f9f9f9]  mb-2">
                    <div className=" flex justify-center items-center ">
                      <img
                        src={imageURL}
                        className="w-24 h-24 lg:w-36 lg:h-36 rounded-md lg:mr-4 object-cover"
                        alt={title}
                      />
                    </div>
                    <div className="flex flex-col justify-center pl-2 md:pl-6">
                      <p className="text-sm md:text-xl font-medium flex flex-wrap">
                        {title}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-black hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(news.length / newsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-2 bg-black hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded ${
                currentPage === i + 1 && "bg-black"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(news.length / newsPerPage)}
          className="bg-black hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewNews;
