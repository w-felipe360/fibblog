import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import useFetchPosts from "../hooks/useFetchPosts";
import { PostType } from "../types/api";

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { data, loading, error } = useFetchPosts<PostType[]>("/posts");

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="flex flex-col min-h-screen max-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(to left, #00aaff, #3475A4)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />

      <div className="flex justify-center lg:justify-between lg:mx-[5%] mt-2 flex-1 mb-10">
        <Sidebar />
        <main className="flex flex-col w-[90%] lg:w-[80%] lg:items-center overflow-auto min-h-96">
          <div className="flex flex-col bg-white rounded-lg min-h-[100%] w-full">
            <div className="max-h-[calc(100vh-150px)] overflow-y-auto rounded-lg scrollbar-hidden">
              <div className="flex flex-col items-center">
                {posts.map((post, index) => (
                  <Post
                    isPostFromUser={post.user_id === user.id}
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    index={
                      posts.length === 1
                        ? undefined
                        : index === 0
                        ? 0
                        : index === posts.length - 1
                        ? undefined
                        : index
                    }
                    onDelete={handleDeletePost}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;