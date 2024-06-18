"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Estate {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const ManageEstates = () => {
  const [estates, setEstates] = useState<Estate[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<File | null>(null);

  useEffect(() => {
    const fetchEstates = async () => {
      const response = await axios.get("https://jacinhomes-api.vercel.app/api/catalog/estate");
      setEstates(response.data);
    };
    fetchEstates();
  }, []);

  const handleEdit = (estate: Estate) => {
    setEditMode(true);
    setEditId(estate._id);
    setTitle(estate.title);
    setDescription(estate.description);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://jacinhomes-api.vercel.app/api/${id}/estate`);
      setEstates(estates.filter((estate) => estate._id !== id));
    } catch (error) {
      console.error("Failed to delete estate", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editId) return;

    try {
      let base64Media: string | undefined;
      if (media) {
        const reader = new FileReader();
        reader.readAsDataURL(media);
        reader.onloadend = async () => {
          base64Media = reader.result?.toString().split(",")[1];
          await updateEstate(base64Media);
        };
      } else {
        await updateEstate();
      }
    } catch (error) {
      console.error("Error updating estate", error);
      alert("Error updating estate.");
    }
  };

  const updateEstate = async (base64Media?: string) => {
    const response = await axios.put(`https://jacinhomes-api.vercel.app/api/${editId}/estate`, {
      title,
      description,
      image: base64Media,
    });

    if (response.status === 200) {
      setEstates(
        estates.map((estate) =>
          estate._id === editId ? response.data : estate
        )
      );
      setEditMode(false);
      setEditId(null);
      setTitle("");
      setDescription("");
      setMedia(null);
    } else {
      alert("Failed to update estate.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Estates</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {estates.map((estate) => (
            <tr key={estate._id}>
              <td className="border px-4 py-2">{estate.title}</td>
              <td className="border px-4 py-2">{estate.description}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 mr-2"
                  onClick={() => handleEdit(estate)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2"
                  onClick={() => handleDelete(estate._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editMode && (
        <form onSubmit={handleSubmit} className="mt-4">
          <h2 className="text-xl font-bold mb-2">Edit Estate</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setMedia(file);
                }
              }}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageEstates;
