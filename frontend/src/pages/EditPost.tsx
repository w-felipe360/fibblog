import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const EditPost: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        const post = response.data;
        setTitle(post.title);
        setDescription(post.description);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!isAuthenticated || !user) {
    navigate("/home");
    return;
  }

  const handleSave = async () => {
    try {
      const updatedPost = {
        user_id: user.id,
        title,
        description,
      };
      const response = await api.put(`/posts/${id}`, updatedPost);
      if (response.status !== 200) {
        throw new Error("Failed to update post");
      }
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(to left, #00aaff, #3475A4)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div className="flex justify-center mb-10 min-h-[30rem]">
        <div className="mt-2 p-6 bg-white rounded-lg shadow-lg min-w-[90%] max-w-[90%] overflow-auto scrollbar-hidden">
          <h1 className="text-3xl font-bold mb-4">Editar Post</h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Texto
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={6}
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
