import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { Link } from "react-router-dom";

const ViewMusic = () => {
  const [music, setMusic] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [musicPerPage] = useState(10); // Change this value to adjust the number of music per page
  const [searchTerm, setSearchTerm] = useState("");

  const docRef = collection(db, "music");

  useEffect(() => {
    const getMusic = async () => {
      const musicSnapshot = await getDocs(docRef);
      setMusic(
        musicSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getMusic();
  }, []);

  // Filtered music based on search term
  const filteredMusic = music.filter(
    (mus) =>
      mus.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mus.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastMusic = currentPage * musicPerPage;
  const indexOfFirstMusic = indexOfLastMusic - musicPerPage;
  const currentMusic = filteredMusic.slice(indexOfFirstMusic, indexOfLastMusic);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full flex  items-center flex-col min-h-screen">
      {/* Search Input */}
      <div className="my-3">
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        />
      </div>

      <div className="lg:min-w-[1200px]">
        {currentMusic.length === 0 ? (
          <div className="flex justify-center items-center w-full min-h-[100vh]">
            <div className="loading-wave ">
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
            </div>
          </div>
        ) : (
          currentMusic.map((mus, index) => {
            const {
              artist,
              audioURL,
              description,
              id,
              imageURL,
              info,
              releaseDate,
              title,
            } = mus;
            return (
              <div key={index}>
                <Link to={`/view-music/${id}`}>
                  <div className="flex flex-row border border-gray-200 bg-[#f9f9f9]  mb-2">
                    <div className=" flex justify-center items-center ">
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
      <div className="flex justify-center my-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-black hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(filteredMusic.length / musicPerPage) },
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
            currentPage === Math.ceil(filteredMusic.length / musicPerPage)
          }
          className="bg-black hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewMusic;
