import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config";
import { toast } from "react-toastify";

const NewsDetails = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const [news, setNews] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      const newsDocRef = doc(db, "news", id); // Reference to the specific document
      const newsDocSnapshot = await getDoc(newsDocRef);

      if (newsDocSnapshot.exists()) {
        setNews({ ...newsDocSnapshot.data(), id: newsDocSnapshot.id });
      } else {
        console.log("Document does not exist!");
      }
    };

    getNews();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      // Update document in Firestore
      const newsDocRef = doc(db, "news", id);
      await updateDoc(newsDocRef, {
        comments: [...(news.comments || []), { name, comment }],
      });

      // Clear input fields after adding comment
      toast.success("Comment added successfully");
      setName("");
      setComment("");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    // <div>
    //   {news ? (
    //     <div>
    //       <div>
    //         <img src={news.imageURL} />
    //         <p>{news.title}</p>
    //         <p>{news.date}</p>
    //         <p>{news.description}</p>
    //         <p>{news.info}</p>
    //         <p>{news.videoURL ? news.videoURL : <p></p>}</p>
    //         {news.comments && (
    //           <div>
    //             {news.comments.map((comment, index) => (
    //               <div key={index} className="border-2">
    //                 <p>Name: {comment.name}</p>
    //                 <p>Comment: {comment.comment}</p>
    //               </div>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //       <div>
    //         <form onSubmit={handleComment}>
    //           <input
    //             type="text"
    //             required
    //             placeholder="Name"
    //             className="border-[1px] border-black"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //           <input
    //             type="text"
    //             required
    //             placeholder="Add comment"
    //             className="border-[1px] border-black"
    //             value={comment}
    //             onChange={(e) => setComment(e.target.value)}
    //           />
    //           <button className="cursor-pointer" type="submit">
    //             submit
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="flex justify-center items-center w-full min-h-[100vh]">
    //       <div className="loading-wave ">
    //         <div className="loading-bar"></div>
    //         <div className="loading-bar"></div>
    //         <div className="loading-bar"></div>
    //         <div className="loading-bar"></div>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div className="min-h-screen flex  justify-center mx-auto px-4 sm:px-[150px] py-8">
      {news ? (
        <div className="container py-4 px-10 flex items-center max-w-[1000px] bg-[#f9f9f9]">
          <div className="grid grid-cols-1 gap-8">
            <div className="max-w-[900px]">
              <img
                src={news.imageURL}
                alt="News Image"
                className="w-full rounded-lg mb-4 max-w-[700px]"
              />
              <p className="text-gray-600 mb-2 font-semibold">{news.date}</p>
              <h2 className="text-2xl font-bold text-black mb-2">
                {news.title}
              </h2>
              <p className="text-gray-600 mb-4 md:text-xl font-semibold">
                {news.description}
              </p>
              <p className="text-gray-600 mb-4 text-justify">{news.info}</p>
              {news.videoURL && (
                <p className="text-gray-600 mb-4">{news.videoURL}</p>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Comments
              </h3>
              {news.comments && (
                <div className="w-fit md:min-w-[600px]">
                  {news.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="comment bg-white rounded-lg p-4 mb-4"
                    >
                      <p className="text-black">Name: {comment.name}</p>
                      <p className="text-gray-700">
                        Comment: {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <form onSubmit={handleComment} className="w-fit md:min-w-[600px]">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="input-field mb-2 border border-gray-400 rounded-md px-4 py-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  required
                  placeholder="Add comment"
                  className="input-field mb-2 border border-gray-400 rounded-md px-4 py-2 w-full"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="submit-button bg-black text-white py-2 px-4 rounded-md cursor-pointer"
                  type="submit"
                >
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-container flex justify-center items-center min-h-screen">
          <div className="loading-wave">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        </div>
      )}
    </div>
  ); // Adjust UI to handle loading state
};

export default NewsDetails;
