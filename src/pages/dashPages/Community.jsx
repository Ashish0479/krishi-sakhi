import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Heart, Send, Plus, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  likePost,
  addComment,
  addAnswer,
} from "../../redux/slices/communitySlice";
import toast from "react-hot-toast";

export default function CommunityPage() {
  const [activePostId, setActivePostId] = useState(null);
  const [activeAnswerId, setActiveAnswerId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [answerText, setAnswerText] = useState("");

  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.community);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLike = async (postId) => {
    try {
      await dispatch(likePost(postId)).unwrap();
    } catch (err) {
      toast.error("Failed to like post.");
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!commentText.trim()) return;
    try {
      await dispatch(addComment({ postId, text: commentText })).unwrap();
      setCommentText("");
    } catch (err) {
      toast.error("Failed to add comment.");
    }
  };

  const handleAnswerSubmit = async (postId) => {
    if (!answerText.trim()) return;
    try {
      await dispatch(addAnswer({ postId, text: answerText })).unwrap();
      setAnswerText("");
    } catch (err) {
      toast.error("Failed to add answer.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <h1 className="text-2xl font-bold text-green-800 mb-4">🌱 Community</h1>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4"
          >
            {/* Post Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">{post.author || "Unknown"}</span>
              <span className="text-gray-500 text-xs ml-auto">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : "Just now"}
              </span>
            </div>


            {/* Post Content */}
            <div className="mb-3 text-gray-700">
              {post.question && <p className="mb-2">{post.question}</p>}
              {post.description && <p className="mb-2">{post.description}</p>}
              <div className="mt-2">
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-300 max-h-80 object-cover rounded-xl"
                  />
                )}
              </div>

            </div>


            {/* Action Buttons */}
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <button
                className="flex items-center gap-1 hover:text-red-500"
                onClick={() => handleLike(post._id)}
              >
                <Heart className="w-4 h-4" /> {post.likes?.length || 0}
              </button>
              <button
                className="flex items-center gap-1 hover:text-green-500"
                onClick={() =>
                  setActivePostId(activePostId === post._id ? null : post._id)
                }
              >
                <MessageCircle className="w-4 h-4" /> Comment
              </button>
              <button
                className="flex items-center gap-1 hover:text-blue-500"
                onClick={() =>
                  setActiveAnswerId(
                    activeAnswerId === post._id ? null : post._id
                  )
                }
              >
                <FileText className="w-4 h-4" /> Answers
              </button>
            </div>

            {/* Comments */}
            <AnimatePresence>
              {activePostId === post._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-2"
                >
                  {post.comments?.length > 0 ? (
                    post.comments.map((comment, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm bg-gray-100 rounded-xl px-3 py-1"
                      >
                        <span className="font-semibold">
                          {comment.author || "U"}:
                        </span>
                        <span>{comment.text || comment.content}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No comments yet.</p>
                  )}

                  {/* Comment Input */}
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 border rounded-xl p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    <button
                      className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      onClick={() => handleCommentSubmit(post._id)}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Answers */}
            <AnimatePresence>
              {activeAnswerId === post._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 space-y-2"
                >
                  {post.answers?.length > 0 ? (
                    post.answers.map((ans, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm bg-blue-50 rounded-xl px-3 py-2"
                      >
                        <span className="font-semibold">
                          {ans.author || "A"}:
                        </span>
                        <span>{ans.text || ans.content}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No answers yet.</p>
                  )}

                  {/* Answer Input */}
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Write your answer..."
                      className="flex-1 border rounded-xl p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => handleAnswerSubmit(post._id)}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Floating Ask Community Button */}
      <button
        onClick={() => navigate("/post")}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
