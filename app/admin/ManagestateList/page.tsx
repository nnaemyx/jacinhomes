"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Estate {
  _id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
}

const ManageEstates = () => {
  const [estates, setEstates] = useState<Estate[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

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
      await axios.delete(`https://jacinhomes-api.vercel.app/api/catalog/estate/${id}`);
      setEstates(estates.filter((estate) => estate._id !== id));
    } catch (error) {
      console.error("Failed to delete estate", error);
    }
  };

  const handleFileUpload = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editId) return;
    setLoading(true); // Set loading state to true

    try {
      let base64Media: string | undefined;
      if (media) {
        base64Media = await handleFileUpload(media);
        await updateEstate(base64Media.split(",")[1]);
      } else {
        await updateEstate();
      }
    } catch (error) {
      console.error("Error updating estate", error);
      alert("Error updating estate.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const updateEstate = async (base64Media?: string) => {
    const response = await axios.put(`https://jacinhomes-api.vercel.app/api/catalog/estate/${editId}`, {
      title,
      description,
      media: base64Media,
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
            <label className="block text-gray-700">Upload Image/Video</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setMedia(file);
                }
              }}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageEstates;
