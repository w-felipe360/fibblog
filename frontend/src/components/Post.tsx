import React, { useState } from "react";
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import api from "../services/api";

interface PostProps {
  id: number;
  title: string;
  description: string;
  index?: number;
  isPostFromUser?: boolean;
  onDelete: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  description,
  index,
  isPostFromUser,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const truncate = (str: string, n: number) =>
    str.length > n ? str.substring(0, n - 1) + "..." : str;

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = async () => {
    await api.delete(`/posts/${id}`);
    onDelete(id);
    closeModal();
  };

  const isFirstIndex = index === 0;
  const isLastIndex = index === undefined;

  const containerClassName = `bg-white p-6 shadow-lg w-full ${
    isFirstIndex ? "rounded-t-lg" : ""
  } ${isLastIndex ? "rounded-b-lg" : ""}`;

  return (
    <>
      <div className={containerClassName}>
        <div
          onClick={handleClick}
          className="p-2 py-4 hover:bg-gray-400 rounded-lg cursor-pointer mb-2"
        >
          <div className="flex w-full justify-between items-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
          </div>
          <p className="text-gray-700">{truncate(description, 350)}</p>
        </div>

        {isPostFromUser && (
          <div className="mb-2 flex space-x-4">
            <button
              onClick={() => {
                navigate(`/post/${id}/edit`);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              <HiMiniPencilSquare size={20} />
            </button>
            <button
              onClick={openModal}
              className="text-pink-600 hover:text-pink-800"
            >
              <HiMiniTrash size={20} />
            </button>
          </div>
        )}

        {!isLastIndex && <div className="h-0.5 mt-8 bg-gray-400" />}
      </div>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title="Confirmar Exclusão"
          message="Você tem certeza de que deseja excluir este post?"
        >
          <div className="flex gap-4">
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Sim, excluir
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Post;