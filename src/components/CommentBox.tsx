"use client"
import { ArrowUp, Loader2, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentBox = ({ id }: { id: string }) => {
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const router=useRouter()

  const handleCommentSubmit = async () => {
    try {
      setIsPosting(true);
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      setComment("");
      setIsPosting(false);
      router.refresh()
      // setAllComment((prev) => [data, ...prev]);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="ring-1 ring-neutral-400 w-full flex items-center justify-center hover:ring-2 focus-within:ring-2 rounded-md px-2 py-2 gap-2 focus-within:ring-green-700/70">
      <MessageSquare size={20} className="text-neutral-400" />
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className=" w-full outline-0"
        placeholder="Share your thoughts ..."
        disabled={isPosting}
      />
      <button
        onClick={handleCommentSubmit}
        type="submit"
        className="bg-green-600 px-2 py-1 rounded-sm cursor-pointer hover:ring-3 hover:ring-green-600 hover:ring-offset-2 hover:ring-offset-white transition-all duration-200 overflow-hidden"
      >
        {!isPosting ? (
          <ArrowUp className="text-white active:-translate-y-8 transition-all duration-200" />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </button>
    </div>
  );
};

export default CommentBox;
