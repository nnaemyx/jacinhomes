"use client";
import { useState } from "react";

const Estate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUpload = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Failed to convert image to base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description || !image) {
      setError("All fields are required");
      return;
    }

    try {
      const imageBase64 = await handleImageUpload(image);

      const payload = {
        title,
        description,
        image: imageBase64.split(",")[1], // Remove the Data URL prefix to keep only the base64 string
      };

      const response = await fetch("https://jacinhomes-api.vercel.app/api/catalog/estate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess("Estate uploaded successfully");
      } else {
        const data = await response.json();
        setError(data.message || "Upload failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Upload Estate</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="block w-full p-2 mb-4 border"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="block w-full p-2 mb-4 border"
        ></textarea>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setImage(file);
          }}
          className="block w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Estate;
