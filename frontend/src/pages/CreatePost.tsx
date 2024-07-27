// src/pages/CreatePost.tsx
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import posts from "../data/posts";

const CreatePost: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <Navigate to="/home" />;
  }

  const handleSave = () => {
    // Lógica para salvar o novo post
    // substituir pelo código real para salvar o post no servidor

    const newPost = {
      id: posts.length + 1, // Exemplo simples, idealmente o servidor geraria o ID
      user_id: user.id,
      title,
      description,
    };

    posts.push(newPost); // Isso é apenas um mock, deve ser substituído pelo serviço de persistência real
    console.log("Post created", { title, description });
    navigate(`/post/${newPost.id}`);
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
          <h1 className="text-3xl font-bold mb-4">Criar Post</h1>
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
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
