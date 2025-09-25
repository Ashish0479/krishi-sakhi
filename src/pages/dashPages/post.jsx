import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/slices/communitySlice";
import toast from "react-hot-toast";
import farmland from "../../assets/farmland.jpg";

function Post() {
  const [photo, setPhoto] = useState(null);
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.community);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error("Question is required!");
      return;
    }

    try {
      const formData = new FormData();
      if (photo) formData.append("image", photo); // backend expects "image"
      formData.append("question", question);
      formData.append("description", description);

      await dispatch(addPost(formData)).unwrap();
      toast.success("Post submitted successfully!");

      // Reset form
      setPhoto(null);
      setQuestion("");
      setDescription("");
    } catch (err) {
      toast.error("Failed to submit post.");
    }
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${farmland})` }}
    >
      <div className="mb-6 px-2 py-2 rounded-2xl w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <h1 className="text-2xl font-bold text-center mb-4">
            Ask Community
          </h1>

          <div>
            <label className="block font-semibold mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="border rounded p-2 w-full"
            />
            {photo && (
              <p className="text-green-600 text-sm mt-1">
                Selected: {photo.name}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter your question..."
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2 w-full"
              rows={4}
              placeholder="Add more details..."
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
