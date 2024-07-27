import React from "react";

interface ModalProps {
  onClose: () => void;
  title: string;
  message: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, title, message, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 min-w-96">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        {children ? (
          children
        ) : (
          <button
            onClick={onClose}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
