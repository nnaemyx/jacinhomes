"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Example validation, you can add more robust validation as needed
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Create FormData object and append fields
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      // Send data to backend for signup
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Redirect to success page or dashboard after successful signup
        router.push("/login"); // Replace with your success page route
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mt-[10rem] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-1">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </label>
        </div>
        <br />
        <div  className="mb-4">
          <label className="block mb-1">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </label>
        </div>
        <br />
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
