import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

const UserDetails: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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
          <h1 className="text-3xl font-bold mb-4">{user?.name}</h1>
          <p className="text-gray-700">{user?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
