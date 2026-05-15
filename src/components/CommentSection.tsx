"use client";

import { ArrowUp, Dot, Loader2, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
interface Comment {
  id: string;
  content: string;
  createdAt: string;

  author: {
    id: string;
    name: string;
    username: string;
    image?: string;
  };
}
const CommentSection = ({ id }: { id: string }) => {
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState<Comment[]>([]);
  const [isPosting, setIsPosting] = useState(false);

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
      setAllComment((prev) => [data, ...prev]);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/posts/${id}/comments`);
        const data = await res.json();
        setAllComment(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [id, isPosting]);

  return (
    <div className="w-full items-center">
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
      <div className="h-px bg-neutral-400 my-4"></div>
      <div className="flex flex-col items-center justify-center w-full">
        {allComment &&
          allComment.map((comm) => (
            <div key={comm.id} className="w-full">
              <div className=" w-full rounded-md flex px-4 py-2 gap-2">
                <div className="h-full">
                  <div className="size-11 flex items-center justify-center bg-conic-180 from-indigo-600 via-indigo-100 to-indigo-600 rounded-full">
                    <div className="size-10 rounded-full shadow-lg/10 overflow-hidden">
                      <img
                        className="object-cover object-top rounded-full"
                        src="https://images.meigen.ai/cdn-cgi/image/format=auto,quality=85/tweets/2031663655121834175/0.jpg"
                        alt="pic"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-neutral-800">
                  <div className="flex flex-col">
                    <div>{comm?.author?.name}</div>
                    <div className="flex gap-1/2 items-center justify-center">
                      <div className="leading-4 text-sm">
                        @{comm?.author.username}
                      </div>
                      <div>
                        <Dot size={16} />{" "}
                      </div>
                      <div className="text-sm">{comm.createdAt}</div>
                    </div>
                  </div>
                  <div className="mt-4">{comm.content}</div>
                </div>
              </div>
              <div className="h-px bg-neutral-400 my-4"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentSection;
