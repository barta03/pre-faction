"use client";

import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";
import Editor from "@/components/Editor";

export default function EditPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetcing] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Failed to Fetch Post");
          return;
        }
        setTitle(data.title);

        setContent(data.content);
      } catch (error) {
        // console.log(error);
        alert("Network Error");
      } finally {
        setFetcing(false);
      }
    };
    fetchPost();
  }, [params.id]);

  const handleSubmit = async () => {
    if (!title || !content) {
      return alert("Missing fields");
    }
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        // console.log("API Error: ", data.error);
        alert(data.error || "Failed to update Post");
        return;
      }
      router.push("/");
    } catch (error) {
      // console.log("NETWORK ERROR:", error);
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="w-full h-full m-auto p-6 text-3xl">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <input
        name="title"
        id="title"
        className="w-full text-2xl font-bold outline-none border-b pb-2"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Editor content={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="cursor-pointer rounded bg-amber-400 px-4 py-2 text-black"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}
