import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/profile" element={<UserDetails />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
