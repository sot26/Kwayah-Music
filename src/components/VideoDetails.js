import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config";
import { toast } from "react-toastify";

const VideoDetails = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  useEffect(() => {
    const getVideo = async () => {
      const videoDocRef = doc(db, "videos", id); // Reference to the specific document
      const videoDocSnapshot = await getDoc(videoDocRef);

      if (videoDocSnapshot.exists()) {
        setVideo({ ...videoDocSnapshot.data(), id: videoDocSnapshot.id });
      } else {
        console.log("Document does not exist!");
      }
    };

    getVideo();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      // Update document in Firestore
      const videoDocRef = doc(db, "videos", id);
      await updateDoc(videoDocRef, {
        comments: [...(video.comments || []), { name, comment }],
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

  const downloadVideo = () => {
    const link = document.createElement("a");
    link.href = video.videoURL;
    link.download = "video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex  justify-center mx-auto px-4 sm:px-[150px] py-8">
      {video ? (
        <div className="min-h-screen  py-4 px-10  max-w-[1000px] bg-[#f9f9f9]">
          <div className="grid grid-cols-1 gap-8">
            <div className="max-w-[700px]">
              <img
                src={video.imageURL}
                alt="Video Image"
                className=" rounded-lg mb-4 max-h-[400px] w-auto"
              />
              <p className="text-gray-600 mb-2 font-semibold">
                {video.releaseDate}
              </p>
              <h2 className="text-2xl font-bold text-black mb-2">
                {video.artist}
              </h2>
              <h2 className="text-2xl font-medium text-black mb-2">
                {video.title}
              </h2>
              <p className="text-gray-600 mb-4 md:text-xl font-semibold">
                {video.description}
              </p>
              <p className="text-gray-600 mb-4 text-justify">{video.info}</p>
              {video?.ytURL ? (
                <div className="w-full md:w-auto my-3 md:my-9">
                  <iframe
                    className="w-full h-auto md:w-[500px] lg:w-[680px] sm:h-[300px] "
                    src={video.ytURL}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              ) : null}
              {video.videoURL ? (
                <video controls className="w-full h-auto">
                  <source src={video.videoURL}></source>
                </video>
              ) : null}
              {video.videoURL ? (
                <button
                  className="bg-black text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={downloadVideo}
                >
                  Download Video
                </button>
              ) : null}
            </div>
            <div className="comment-section">
              <h3 className="text-xl font-semibold text-black mb-4">
                Comments
              </h3>
              {video.comments && (
                <div className="w-fit md:min-w-[600px]">
                  {video.comments.map((comment, index) => (
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
  );
};

export default VideoDetails;
