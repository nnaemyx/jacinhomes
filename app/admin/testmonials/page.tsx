"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PostTestimonial = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState("image");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message || !media) {
      alert("All fields are required.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(media);
    reader.onloadend = async () => {
      try {
        const base64Media = reader.result?.toString().split(",")[1];
        const response = await axios.post("https://jacinhomes-api.vercel.app/api/catalog/testimonials", {
          name,
          message,
          media: base64Media,
          mediaType,
        });

        if (response.status === 201) {
          alert("Testimonial posted successfully!");
        } else {
          alert("Failed to post testimonial.");
        }
      } catch (error) {
        console.error("Error posting testimonial", error);
        alert("Error posting testimonial.");
      }
    };
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Post a Testimonial</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">
            Message
          </label>
          <textarea
            id="message"
            className="w-full p-2 border border-gray-300 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="media" className="block mb-2">
            Upload Image/Video
          </label>
          <input
            type="file"
            id="media"
            className="w-full p-2 border border-gray-300 rounded"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setMedia(file);
                setMediaType(file.type.startsWith("image") ? "image" : "video");
              }
            }}
            required
          />
        </div>
        <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Post Testimonial
        </button>
      </form>
    </div>
  );
};

export default PostTestimonial;
