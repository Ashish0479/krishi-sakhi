import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, MessageCircle, Heart, Send, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const initialPosts = [
  { id: 1, author: "Ashish", content: "Wheat sowing completed today!", likes: 5 },
  { id: 2, author: "Yash", content: "Any advice on sugarcane fertilization?", likes: 2 },
  { id: 3, author: "Ishan", content: "Rice crop is looking healthy 🌾", likes: 8 },
  { id: 4, author: "Karan", content: "Wheat crop is thriving!", likes: 8 },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [activePostId, setActivePostId] = useState(null);

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    const post = {
      id: posts.length + 1,
      author: "You",
      content: newPost,
      likes: 0,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? {...p, likes: p.likes + 1} : p));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">🌱 Community</h1>

      {/* Create Post */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your updates, questions, or advice..."
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
          rows={3}
        />
        <button
          onClick={handlePostSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Post
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white grid place-items-center font-semibold">
                {post.author[0]}
              </div>
              <span className="font-semibold">{post.author}</span>
              <span className="text-gray-500 text-xs ml-auto">Just now</span>
            </div>
            <p className="mb-3 text-gray-700">{post.content}</p>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <button
                className="flex items-center gap-1 hover:text-red-500"
                onClick={() => handleLike(post.id)}
              >
                <Heart className="w-4 h-4" /> {post.likes}
              </button>
              <button
                className="flex items-center gap-1 hover:text-green-500"
                onClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
              >
                <MessageCircle className="w-4 h-4" /> Comment
              </button>
            </div>

            {/* Comment Input */}
            <AnimatePresence>
              {activePostId === post.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 border rounded-xl p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
