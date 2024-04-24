import Slider from "../components/Slider";
import ViewNews from "../components/ViewNews";
import Music from "./Music";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config";
import { Link } from "react-router-dom";

const Home = () => {
  const [music, setMusic] = useState([]);
  const [news, setNews] = useState([]);
  const [video, setVideo] = useState([]);

  const newsDocRef = collection(db, "news");
  const musicDocRef = collection(db, "music");
  const videoDocRef = collection(db, "videos");

  // get music
  useEffect(() => {
    const getMusic = async () => {
      const music = await getDocs(musicDocRef);
      setMusic(
        music.docs
          .slice(0, 5)
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .reverse()
      );
    };
    getMusic();
  }, []);

  // get news
  useEffect(() => {
    const getNews = async () => {
      const newsSnapshot = await getDocs(newsDocRef);
      const newsData = newsSnapshot.docs
        .slice(0, 10)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .reverse();
      setNews(newsData);
    };
    getNews();
  }, []);

  // get video
  useEffect(() => {
    const getVideo = async () => {
      const video = await getDocs(videoDocRef);
      setVideo(
        video.docs
          .slice(0, 5)
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .reverse()
      );
    };
    getVideo();
  }, []);

  return (
    // <div className="">
    //   <div className="flex flex-col md:flex-row px-[20px] md:px-[150px] py-[50px] bg-white gap-6">
    //     <div className="w-full md:w-[70%] border-[1px] border-black h-fit">
    //       <Slider />
    //       {/* get news */}
    //       <div className="w-full h-auto">
    //         {news.length === 0 ? (
    //           <div className="flex justify-center items-center w-full h-auto">
    //             <div className="loading-wave ">
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //             </div>
    //           </div>
    //         ) : (
    //           news.map((ne, index) => {
    //             const { id, imageURL, title, description } = ne;
    //             return (
    //               <div key={index}>
    //                 <Link to={`/view-news/${id}`}>
    //                   <div className="mb-6 flex flex-row border-[1px] border-black">
    //                     <div className="bg-black min-w-[180px] max-w-[180px]">
    //                       <img
    //                         src={imageURL}
    //                         className="rounded-2xl  h-auto p-2 object-cover"
    //                         alt={title}
    //                       />
    //                     </div>
    //                     <div className="flex flex-col justify-center pl-6">
    //                       <p className="text-xl font-medium">{title}</p>
    //                     </div>
    //                   </div>
    //                 </Link>
    //               </div>
    //             );
    //           })
    //         )}

    //         <div className=" flex justify-center items-center">
    //           <Link to="/news">
    //             <button className="rounded-lg bg-green-500 text-white text-lg px-3 py-2 w-fit">
    //               view more
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //       {/* get news end */}
    //     </div>
    //     <div>
    //       {/* music bar */}
    //       <div className="w-full border-[1px] border-black pb-3">
    //         <p className="w-full bg-slate-500 h-[30px] flex justify-center items-center text-white capitalize mb-3">
    //           WONDERSOUNDS TOP SONGS
    //         </p>
    //         {music.length === 0 ? (
    //           <div className="flex justify-center items-center w-full h-auto">
    //             <div className="loading-wave ">
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //             </div>
    //           </div>
    //         ) : (
    //           music.map((mus, index) => {
    //             const {
    //               artist,
    //               audioURL,
    //               description,
    //               id,
    //               imageURL,
    //               info,
    //               releaseDate,
    //               title,
    //             } = mus;
    //             return (
    //               <div className="w-full">
    //                 <Link to={`/view-music/${id}`}>
    //                   <div
    //                     className="flex flex-row border-[1px] border-black w-full"
    //                     key={index}
    //                   >
    //                     <div className="bg-black min-w-[180px] max-w-[180px]">
    //                       <img
    //                         src={imageURL}
    //                         className="rounded-2xl w-full  object-fill h-auto p-2"
    //                       />
    //                     </div>
    //                     <div className="flex flex-col justify-center pl-6">
    //                       <p className="text-xl font-bold">{artist}</p>
    //                       <p className="text-xl font-medium">{title}</p>
    //                     </div>
    //                   </div>
    //                 </Link>
    //               </div>
    //             );
    //           })
    //         )}
    //       </div>
    //       {/* music ends */}

    //       {/* video start */}
    //       <div className="w-full border-[1px] border-black pb-3">
    //         <p className="w-full bg-slate-500 h-[30px] flex justify-center items-center text-white capitalize mb-3">
    //           WONDERSOUNDS TOP VIDEOS
    //         </p>
    //         {video.length === 0 ? (
    //           <div className="flex justify-center items-center w-full h-auto]">
    //             <div className="loading-wave ">
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //             </div>
    //           </div>
    //         ) : (
    //           video.map((vid, index) => {
    //             const {
    //               artist,
    //               audioURL,
    //               description,
    //               id,
    //               imageURL,
    //               info,
    //               releaseDate,
    //               title,
    //             } = vid;
    //             return (
    //               <div>
    //                 <Link to={`/view-video/${id}`}>
    //                   <div
    //                     className="flex flex-row border-[1px] border-black"
    //                     key={index}
    //                   >
    //                     <div className="bg-black min-w-[180px] max-w-[180px]">
    //                       <img
    //                         src={imageURL}
    //                         className="rounded-2xl w-[180px] h-auto p-2"
    //                       />
    //                     </div>
    //                     <div className="flex flex-col justify-center pl-6">
    //                       <p className="text-xl font-bold">{artist}</p>
    //                       <p className="text-xl font-medium">{title}</p>
    //                     </div>
    //                   </div>
    //                 </Link>
    //               </div>
    //             );
    //           })
    //         )}
    //       </div>
    //       {/* video ends */}
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto px-4 sm:px-[150px] py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-lg h-fit">
          <Slider />
          <div className="px-4 py-6 bg-[#f9f9f9] border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Latest News</h2>
            {news.length === 0 ? (
              <div className="flex justify-center items-center">
                <div className="loading-wave w-16 h-4">
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                </div>
              </div>
            ) : (
              news.map((ne, index) => (
                <div key={index} className="mb-6 ">
                  <Link to={`/view-news/${ne.id}`}>
                    <div className="flex items-center ">
                      <img
                        src={ne.imageURL}
                        className=" w-24 h-24 rounded-md mr-4 object-cover"
                        alt={ne.title}
                      />
                      <div>
                        <p className="text-[14px] sm:text-lg font-semibold">
                          {ne.title}
                        </p>
                        {/* <p className="text-gray-600">{ne.description}</p> */}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
            <div className="flex justify-center">
              <Link to="/news">
                <button className="bg-black text-white py-2 px-3 hover:text-black hover:bg-white rounded-lg">
                  More News
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-8 ">
          <div className="border border-gray-200 rounded-lg">
            <div className="px-4 py-6 bg-[#f9f9f9]">
              <h2 className="text-xl font-semibold mb-4">Top Music</h2>
              {music.length === 0 ? (
                <div className="flex justify-center items-center">
                  <div className="loading-wave w-16 h-4">
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                  </div>
                </div>
              ) : (
                music.map((mus, index) => (
                  <div key={index} className="mb-6">
                    <Link to={`/view-music/${mus.id}`}>
                      <div className="flex items-center">
                        <img
                          src={mus.imageURL}
                          className="w-24 h-24 rounded-md mr-4 object-cover"
                          alt={mus.title}
                        />
                        <div>
                          <p className="text-lg font-semibold">{mus.artist}</p>
                          <p className="text-gray-600">{mus.title}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
              <div className="flex justify-center">
                <Link to="/music">
                  <button className="bg-black text-white py-2 px-3 hover:text-black hover:bg-white rounded-lg">
                    View Music
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg bg-[#f9f9f9]">
            <div className="px-4 py-6">
              <h2 className="text-xl font-semibold mb-4">Top Videos</h2>
              {video.length === 0 ? (
                <div className="flex justify-center items-center">
                  <div className="loading-wave w-16 h-4">
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                  </div>
                </div>
              ) : (
                video.map((vid, index) => (
                  <div key={index} className="mb-6">
                    <Link to={`/view-videos/${vid.id}`}>
                      <div className="flex items-center">
                        <img
                          src={vid.imageURL}
                          className="w-24 h-24 rounded-md mr-4 object-cover"
                          alt={vid.title}
                        />
                        <div>
                          <p className="text-lg font-semibold">{vid.artist}</p>
                          <p className="text-gray-600">{vid.title}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
              <div className="flex justify-center">
                <Link to="/videos">
                  <button className="bg-black text-white py-2 px-3 hover:text-black hover:bg-white rounded-lg">
                    View Videos
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="container mx-auto px-4 md:px-16 py-8">
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //     <div>
    //       {/* News Section */}
    //       <div className="mb-8">
    //         <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
    //         {news.length === 0 ? (
    //           <div className="flex justify-center items-center w-full h-auto">
    //             <div className="loading-wave ">
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //             </div>
    //           </div>
    //         ) : (
    //           news.map((ne, index) => {
    //             const { id, imageURL, title } = ne;
    //             return (
    //               <div
    //                 key={index}
    //                 className="mb-6 border-b border-gray-300 pb-6"
    //               >
    //                 <Link to={`/view-news/${id}`} className="flex items-center">
    //                   <img
    //                     src={imageURL}
    //                     className="w-24 h-24 object-cover rounded-md mr-4"
    //                     alt={title}
    //                   />
    //                   <p className="text-lg font-medium">{title}</p>
    //                 </Link>
    //               </div>
    //             );
    //           })
    //         )}
    //         <div className="text-center">
    //           <Link to="/news" className="text-green-500 font-medium">
    //             View More
    //           </Link>
    //         </div>
    //       </div>
    //       {/* Music Section */}
    //       <div className="mb-8">
    //         <h2 className="text-2xl font-semibold mb-4">Top Songs</h2>
    //         {music.length === 0 ? (
    //           <div className="flex justify-center items-center w-full h-auto">
    //             <div className="loading-wave ">
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //             </div>
    //           </div>
    //         ) : (
    //           music.map((mus, index) => {
    //             const { id, imageURL, artist, title } = mus;
    //             return (
    //               <div
    //                 key={index}
    //                 className="mb-6 border-b border-gray-300 pb-6"
    //               >
    //                 <Link
    //                   to={`/view-music/${id}`}
    //                   className="flex items-center"
    //                 >
    //                   <img
    //                     src={imageURL}
    //                     className="w-24 h-24 object-cover rounded-md mr-4"
    //                     alt={title}
    //                   />
    //                   <div>
    //                     <p className="text-lg font-semibold">{artist}</p>
    //                     <p className="text-lg font-medium">{title}</p>
    //                   </div>
    //                 </Link>
    //               </div>
    //             );
    //           })
    //         )}
    //       </div>
    //     </div>
    //     <div>
    //       {/* Video Section */}
    //       <div>
    //         <h2 className="text-2xl font-semibold mb-4">Top Videos</h2>
    //         {video.length === 0 ? (
    //           <div className="flex justify-center items-center w-full h-auto">
    //             <div className="loading-wave ">
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //               <div className="loading-bar"></div>
    //             </div>
    //           </div>
    //         ) : (
    //           video.map((vid, index) => {
    //             const { id, imageURL, artist, title } = vid;
    //             return (
    //               <div
    //                 key={index}
    //                 className="mb-6 border-b border-gray-300 pb-6"
    //               >
    //                 <Link
    //                   to={`/view-video/${id}`}
    //                   className="flex items-center"
    //                 >
    //                   <img
    //                     src={imageURL}
    //                     className="w-24 h-24 object-cover rounded-md mr-4"
    //                     alt={title}
    //                   />
    //                   <div>
    //                     <p className="text-lg font-semibold">{artist}</p>
    //                     <p className="text-lg font-medium">{title}</p>
    //                   </div>
    //                 </Link>
    //               </div>
    //             );
    //           })
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
