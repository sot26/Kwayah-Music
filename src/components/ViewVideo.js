import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const ViewVideo = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(10); // Adjust the number of videos per page as needed
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const docRef = collection(db, "videos");

  useEffect(() => {
    const getVideos = async () => {
      const videoSnapshot = await getDocs(docRef);
      setVideos(
        videoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getVideos();
  }, []);

  // Pagination Logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

  // Filter videos based on search term
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when search term changes
  };

  return (
    <div className="flex w-full items-center flex-col min-h-screen">
      {/* Search Input */}
      <div className="my-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-1 w-full"
        />
      </div>

      <div className="lg:min-w-[1200px]">
        {currentVideos.length === 0 ? (
          <div className="flex justify-center items-center w-full min-h-[100vh]">
            <div className="loading-wave ">
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
            </div>
          </div>
        ) : (
          currentVideos.map((vid, index) => {
            const { artist, id, imageURL, title } = vid;
            return (
              <div key={index}>
                <Link to={`/view-videos/${id}`}>
                  <div className="flex flex-row border border-gray-200 bg-[#f9f9f9]  mb-2">
                    <div className=" flex justify-center items-center">
                      <img
                        src={imageURL}
                        className="w-24 h-24 lg:w-36 lg:h-36 rounded-md lg:mr-4 object-cover"
                        alt={title}
                      />
                    </div>
                    <div className="flex flex-col justify-center pl-2 md:pl-6">
                      <p className="text-sm md:text-xl font-bold flex flex-wrap">
                        {artist}
                      </p>
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
          className="bg-black hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded-l object-cover"
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(filteredVideos.length / videosPerPage) },
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
          disabled={
            currentPage === Math.ceil(filteredVideos.length / videosPerPage)
          }
          className="bg-black hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewVideo;
