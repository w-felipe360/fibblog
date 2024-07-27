// src/pages/PostDetails.tsx
import React from "react";
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { Navigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAuth } from "../contexts/AuthContext";
import comments from "../data/comments"; // Importa o arquivo de comentários
import posts from "../data/posts";

const PostDetails: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCommentId, setEditingCommentId] = React.useState<number | null>(
    null
  );
  const [editedCommentText, setEditedCommentText] = React.useState<string>("");

  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }

  const { id } = useParams<{ id: string }>();

  // Busca os detalhes do post usando o id
  const post = posts.find((post) => post.id === Number(id));

  // Filtra os comentários para o post atual
  const postComments = comments.filter(
    (comment) => comment.post_id === Number(id)
  );

  // Função para abrir o modal de exclusão
  const openModal = (_id: number) => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = () => {
    // Lógica para deletar o post
    console.log(`Post ${id} deletado`);
    closeModal();
  };

  const startEditingComment = (commentId: number, commentText: string) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
  };

  const saveComment = () => {
    // Lógica para salvar o comentário editado
    console.log(
      `Comentário ${editingCommentId} atualizado para: ${editedCommentText}`
    );
    setEditingCommentId(null);
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
      <div className="flex flex-col items-center mb-10 min-h-[30rem]">
        <div className="mt-2 p-6 bg-white rounded-lg shadow-lg min-w-[90%] max-w-[90%] overflow-auto scrollbar-hidden">
          <h1 className="text-3xl font-bold mb-4">{post?.title} </h1>
          <p className="text-gray-700 mb-10">{post?.description}</p>

          {/* Linha Horizontal para separar */}
          <hr className="my-6 border-gray-400" />

          {/* Seção de Comentários */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Comentários</h2>
            {postComments.length > 0 ? (
              postComments.map((comment) => (
                <div
                  key={comment.id}
                  className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm flex flex-col lg:flex-row items-center justify-between"
                >
                  <div className="w-full lg:w-full">
                    <p className="font-semibold">Usuário {comment.user_id}:</p>
                    {editingCommentId === comment.id ? (
                      <div className="relative">
                        <textarea
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
                          rows={3}
                          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none"
                          placeholder="Digite seu comentário..."
                        />
                        <button
                          onClick={saveComment}
                          className="absolute bottom-3 right-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-700">{comment.text}</p>
                    )}
                  </div>
                  {comment.user_id === user.id && (
                    <div className="flex justify-end w-full lg:space-x-2">
                      {!editingCommentId ? (
                        <button
                          onClick={() =>
                            startEditingComment(comment.id, comment.text)
                          }
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <HiMiniPencilSquare size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Cancelar
                        </button>
                      )}
                      <button
                        onClick={() => openModal(comment.id)}
                        className="text-red-600 hover:text-red-800 flex items-center justify-center"
                      >
                        <HiMiniTrash size={20} />
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-700">Nenhum comentário ainda.</p>
            )}
          </div>
          {isModalOpen && (
            <Modal
              onClose={closeModal}
              title="Confirmar Exclusão"
              message="Você tem certeza de que deseja excluir este comentário?"
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
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
