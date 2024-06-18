"use client"
import { useState } from "react";
import axios from "axios";

const PostFlyerPromo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [type, setType] = useState<'flyer' | 'promo'>('flyer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !media) {
      alert("All fields are required.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(media);
    reader.onloadend = async () => {
      try {
        const base64Media = reader.result?.toString().split(",")[1];
        const response = await axios.post("https://jacinhomes-api.vercel.app/api/catalog/flyers", {
          title,
          description,
          image: base64Media,
          type,
        });

        if (response.status === 201) {
          alert("Flyer/Promo posted successfully!");
        } else {
          alert("Failed to post flyer/promo.");
        }
      } catch (error) {
        console.error("Error posting flyer/promo", error);
        alert("Error posting flyer/promo.");
      }
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Flyer or Promo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type" className="block text-gray-700">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'flyer' | 'promo')}
            required
            className="w-full p-2 border border-gray-300"
          >
            <option value="flyer">Flyer</option>
            <option value="promo">Promo</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="media" className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            id="media"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setMedia(file);
              }
            }}
            required
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Post Flyer/Promo</button>
      </form>
    </div>
  );
};

export default PostFlyerPromo;
