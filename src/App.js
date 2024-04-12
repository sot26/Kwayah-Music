import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Music from "./pages/Music";
import Navbar from "./components/Navbar";
import News from "./pages/News";
import Videos from "./pages/Videos";
import Home from "./pages/Home";
import NewsDetails from "./components/NewsDetails";
import MusicDetails from "./components/MusicDetails";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoDetails from "./components/VideoDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/music" element={<Music />} />
        <Route path="/news" element={<News />} />
        <Route path="/view-news/:id" element={<NewsDetails />} />
        <Route path="/view-videos/:id" element={<VideoDetails />} />
        <Route path="/view-music/:id" element={<MusicDetails />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
