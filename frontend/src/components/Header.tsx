import React from "react";
import { FaDoorOpen, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IoMdCreate } from "react-icons/io";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Add this line to import the useNavigate function

  return (
    <div className="flex w-full items-center justify-center">
      <header className="bg-white rounded-xl text-gray-800 py-4 w-[90%] shadow-lg mt-8 z-50">
        <div className="flex justify-between items-center px-4 mx-auto">
          <img
            onClick={() => navigate("/home")}
            alt="Fibblog-logo"
            src="https://github.com/user-attachments/assets/a48bf724-237b-45ab-8923-99cf450b1537"
            className="h-10 w-auto hover:cursor-pointer hover:opacity-80 transition-opacity duration-300"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 border-none text-white min-w-24 font-bold py-2 px-4 rounded items-center justify-center gap-2 flex"
            >
              <FaDoorOpen className="inline-block text-2xl text-red-200" />
              Sair
            </button>
            <IoMdCreate onClick={() => {
              navigate("/create");
            }} className="text-5xl cursor-pointer hover:text-gray-700" />
            <FaUserCircle
              onClick={() => navigate("/profile")} // Replace useNavigate with navigate
              className="text-4xl lg:text-5xl hover:text-gray-700 cursor-pointer"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
