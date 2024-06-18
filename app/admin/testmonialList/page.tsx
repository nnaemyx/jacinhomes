"use client"

import { useState, useEffect } from "react";
import axios from "axios";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState("image");

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await axios.get("https://jacinhomes-api.vercel.app/api/catalog/testimonials");
      setTestimonials(response.data);
    };
    fetchTestimonials();
  }, []);

  const handleEdit = (testimonial) => {
    setEditMode(true);
    setEditId(testimonial._id);
    setName(testimonial.name);
    setMessage(testimonial.message);
    setMediaType(testimonial.mediaType);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://jacinhomes-api.vercel.app/api/${id}/testimonial`);
    setTestimonials(testimonials.filter((t) => t._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !message || !media) {
      alert("All fields are required.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(media);
    reader.onloadend = async () => {
      const base64Media = reader.result?.toString().split(",")[1];
      if (editMode) {
        await axios.put(`https://jacinhomes-api.vercel.app/api/${editId}/testimonial`, {
          name,
          message,
          media: base64Media,
          mediaType,
        });
        setEditMode(false);
      } else {
        await axios.post("https://jacinhomes-api.vercel.app/api/catalog/testimonials", {
          name,
          message,
          media: base64Media,
          mediaType,
        });
      }
      setName("");
      setMessage("");
      setMedia(null);
      const response = await axios.get("https://jacinhomes-api.vercel.app/api/catalog/testimonials");
      setTestimonials(response.data);
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Testimonials</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="media" className="block mb-1">Upload Image/Video</label>
          <input
            type="file"
            id="media"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setMedia(file);
                setMediaType(file.type.startsWith("image") ? "image" : "video");
              }
            }}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {editMode ? "Update Testimonial" : "Post Testimonial"}
        </button>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Media</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial._id}>
              <td className="border p-2">{testimonial.name}</td>
              <td className="border p-2">{testimonial.message}</td>
              <td className="border p-2">
                {testimonial.mediaType === "image" ? (
                  <img src={testimonial.media} alt="Testimonial" className="w-16 h-16" />
                ) : (
                  <video src={testimonial.media} controls className="w-16 h-16" />
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTestimonials;
