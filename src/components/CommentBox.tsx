"use client";
import { useSession } from "@/lib/auth-client";
import { ArrowUp, Loader2, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentBox = ({ id }: { id: string }) => {
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const loggedIn = !!session?.user;
  const router = useRouter();

  const handleCommentSubmit = async () => {
    if (loggedIn) {
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
        router.refresh();
        // setAllComment((prev) => [data, ...prev]);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      } finally {
        setIsPosting(false);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative ring-1 ring-neutral-400 w-full flex items-center justify-center hover:ring-2 focus-within:ring-2 rounded-md px-2 py-2 gap-2 focus-within:ring-green-700/70">
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-2xl font-bold">Sign in required</h2>

            <p className="mt-2 text-neutral-600">
              You need an account to create and publish posts on prepost.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border-2 border-black px-4 py-2 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => router.push("/sign-in")}
                className="rounded-md bg-purple-600 px-4 py-2 text-white border-2 border-black cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
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
