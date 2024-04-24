import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config";
import { toast } from "react-toastify";

const MusicDetails = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const [music, setMusic] = useState(null);
  useEffect(() => {
    const getMusic = async () => {
      const musicDocRef = doc(db, "music", id); // Reference to the specific document
      const musicDocSnapshot = await getDoc(musicDocRef);

      if (musicDocSnapshot.exists()) {
        setMusic({ ...musicDocSnapshot.data(), id: musicDocSnapshot.id });
      } else {
        console.log("Document does not exist!");
      }
    };

    getMusic();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      // Update document in Firestore
      const musicDocRef = doc(db, "music", id);
      await updateDoc(musicDocRef, {
        comments: [...(music.comments || []), { name, comment }],
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

  const downloadAudio = () => {
    const link = document.createElement("a");
    link.href = music.audioURL;
    link.download = "music.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex  justify-center mx-auto px-4 sm:px-[150px] py-8">
      {music ? (
        <div className="min-h-screen  py-4 px-10  max-w-[1000px] bg-[#f9f9f9]">
          <div className="grid grid-cols-1 gap-8">
            <div className="max-w-[700px]">
              <img
                src={music.imageURL}
                alt="News Image"
                className=" rounded-lg mb-4 max-h-[400px] w-auto"
              />
              <p className="text-gray-600 mb-2 font-semibold">
                {music.releaseDate}
              </p>
              <h2 className="text-2xl font-bold text-black mb-2">
                {music.artist}
              </h2>
              <h2 className="text-2xl font-medium text-black mb-2">
                {music.title}
              </h2>
              <p className="text-gray-600 mb-4 md:text-xl font-semibold">
                {music.description}
              </p>
              <p className="text-gray-600 mb-4 text-justify">{music.info}</p>
              {music.audioURL ? (
                <audio controls>
                  <source src={music.audioURL}></source>
                </audio>
              ) : null}
              <button
                className="bg-black text-white py-2 px-4 rounded-md cursor-pointer mt-4"
                onClick={downloadAudio}
              >
                Download Audio
              </button>
              <p className="text-xl font-bold mt-6">Listen here:</p>
              {music?.ytURL ? (
                <div className="w-full md:w-auto my-3">
                  <iframe
                    className="w-full h-auto md:w-[500px] lg:w-[680px] sm:h-[300px] "
                    src={music.ytURL}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              ) : null}
            </div>
            <div className="comment-section">
              <h3 className="text-xl font-semibold text-black mb-4">
                Comments
              </h3>
              {music.comments && (
                <div className="w-fit md:min-w-[600px]">
                  {music.comments.map((comment, index) => (
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

export default MusicDetails;
