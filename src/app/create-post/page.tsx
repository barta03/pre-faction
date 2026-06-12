"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";

export default function WritePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !content) return alert("Missing fields");

    setLoading(true);
    // const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`
        },
        // credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json(); // 👈 ALWAYS read response

      if (!res.ok) {
        // console.log("API ERROR:", data);
        alert(data.error || "Failed to create post");
        return;
      }

      router.push("/");
    } catch (error) {
      // console.log("NETWORK ERROR:", error);
      alert("Network error");
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      
      <input
        name="title"
        id="title"
        className="w-full text-2xl font-bold outline-none border-b pb-2"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Editor content={null} onChange={setContent} />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2  text-black rounded cursor-pointer bg-amber-400"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}
