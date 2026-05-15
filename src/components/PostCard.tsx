"use client";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { MessageSquareText } from "@/components/animate-ui/icons/message-square-text";
import {
  Edit,
  EllipsisVertical,
  HeartIcon,
  ShareIcon,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PostContent from "./PostContent";

import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "./animate-ui/icons/heart";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PostCard {
  id: string;
  fullName: string;
  userName: string;
  profile_img?: string;
  title: string;
  content: string;
  comments?: number;
  likes?: number;
  likedByCurrentUser?: boolean;
}

const PostCard = ({
  id,
  fullName,
  userName,
  profile_img,
  title,
  content,
  comments,
  likes,
  likedByCurrentUser,
}: PostCard) => {
  const [like, setLike] = useState<boolean>(likedByCurrentUser || false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(likes ?? 0);
  // const [isOverflowing, setIsOverflowing] = useState(false);

  const router = useRouter();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) return;
    setIsDeleting(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Failed to delete post");
          return;
        }
        router.refresh();
      } catch (error) {
        console.log(error);
        alert("Network Error");
      }
    }, 250);
  };

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    const previousLikeState = like;
    const previousCount = likesCount;
    console.log("LIKE clicked");

    setLike((prev) => !prev);
    setLikesCount((prev) => (previousLikeState ? prev - 1 : prev + 1));

    try {
      const res = await fetch(`/api/posts/${id}/like`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setLike(data.liked);
      setLikesCount(data.likesCount);
      console.log("LIKED UPDATED");
    } catch (error) {
      setLike(previousLikeState);
      setLikesCount(previousCount);
      console.log(error);
    } finally {
      setIsLiking(false);
    }
  };

  const shouldMaskContent = (content: any) => {
    if (!content?.content) return false;

    let totalLength = 0;

    const traverse = (nodes: any[]) => {
      nodes.forEach((node) => {
        if (node.text) {
          totalLength += node.text.length;
        }

        if (node.content) {
          traverse(node.content);
        }
      });
    };

    traverse(content.content);

    return totalLength > 500;
  };

  const isOverflowing = shouldMaskContent(content);

  return (
    <AnimatePresence>
      {!isDeleting && (
        <motion.div
          initial={{
            opacity: 1,
            scale: 1,
            height: "auto",
          }}
          exit={{
            opacity: 0,
            scale: 0,
            height: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="origin-top"
        >
          <div
            // onClick={() => setIsMenuOpen(false)}
            className="h-px w-full bg-neutral-400 "
          ></div>
          <div className=" post-card w-full py-4 flex gap-2 hover:bg-neutral-400/10 px-4 my-2 rounded-md origin-top transition-colors">
            <div className="h-full">
              {/* <div className="size-10 rounded-full bg-linear-to-tl from-green-600 to-lime-400"></div> */}
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
            <div className="flex flex-col justify-between gap-6 h-full w-full">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="flex flex-col ">
                    <p className="font-semibold text-md">{fullName}</p>
                    <p className="text-sm -mt-1 hover:text-green-800 hover:underline cursor-pointer">
                      @{userName}
                    </p>
                  </div>
                  <div>
                    {/* <button className="px-4 py-1 border border-transparent bg-cyan-500 cursor-pointer text-white text-sm font-semibold rounded-sm  hover:border hover:border-cyan-400 hover:bg-white hover:text-cyan-500 active:inset-shadow-sm active:inset-shadow-cyan-600 transition-all duration-200">
                      Follow
                    </button> */}
                    <button className="text-sm text-blue-500 hover:underline hover:underline-offset-2 hover:text-blue-600/90 cursor-pointer font-semibold">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="relative " ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className=" px-2 py-2 rounded-full hover:bg-neutral-400/10 shadow-2xl/5 cursor-pointer"
                  >
                    <EllipsisVertical className="size-5" />
                  </button>{" "}
                  {isMenuOpen && (
                    <div className="absolute bg-neutral-100 outline-1 shadow-2xl/10 outline-neutral-500/20 rounded-xl w-30 h-40 top-full right-0 z-110 flex flex-col gap-1 px-2 py-2">
                      <button className="flex items-center gap-1 hover:bg-neutral-300/70 py-1 px-2 rounded-sm cursor-pointer">
                        <TriangleAlert size={16} />
                        Report
                      </button>
                      <button
                        onClick={() => router.push(`/edit-post/${id}`)}
                        className="flex w-full items-center gap-1 hover:bg-neutral-300/70 py-1 px-2 rounded-sm cursor-pointer"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button className="flex items-center gap-1 hover:bg-neutral-300/70 py-1 px-2 rounded-sm cursor-pointer">
                        <ShareIcon size={16} />
                        Share
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-1 bg-red-500/90 hover:bg-red-600 text-neutral-100  py-1 px-2 rounded-sm cursor-pointer"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div
                onClick={() => router.push(`/posts/${id}`)}
                className={cn(
                  "text-sm pr-4 tracking-wide cursor-pointer max-h-200 overflow-hidden",
                )}
                style={
                  isOverflowing
                    ? {
                        maskImage:
                          "linear-gradient(to bottom, black 70%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, black 70%, transparent 100%)",
                      }
                    : undefined
                }
              >
                <h1 className="font-extrabold text-neutral-700 tracking-tight text-xl">
                  {title}
                </h1>
                <br />
                <p className="line-clamp-8 text-balance  text-neutral-800 leading-6"></p>
                {/* <div className="post-preview max-h-175 overflow-hidden"> */}
                <div className="post-preview overflow-hidden ">
                  <PostContent content={content} />
                </div>
              </div>
              <div className="w-full text-neutral-700 flex gap-2">
                <button className="flex cursor-pointer group ">
                  <AnimateIcon
                    animateOnHover
                    className=" rounded-md text-sm bg-neutral-100  flex justify-center items-center gap-1 p-1 duration-200 transition-all"
                  >
                    <MessageSquareText
                      className={
                        "size-6 stroke-1 pt-1 pb-0.5 group-hover:bg-sky-200 group-hover:text-sky-600 rounded-sm duration-200 transition-all"
                      }
                    />
                    <p className="pb-1 pr-1 text-md text-neutral-700 duration-200 transition-all">
                      {comments}
                    </p>
                  </AnimateIcon>
                </button>

                <button
                  onClick={handleLike}
                  className="flex cursor-pointer group"
                >
                  <div className="rounded-md text-sm bg-neutral-100 flex justify-center items-center gap-1 p-1 duration-200 transition-all">
                    {!isLiking ? (
                      <HeartIcon
                        className={`size-7 stroke-1 py-1 group-hover:bg-pink-200 group-hover:scale-105  group-hover:text-pink-500 rounded-sm duration-200 transition-all ${like && "fill-pink-500 text-pink-500 "}`}
                      />
                    ) : (
                      <Heart
                        loop
                        className={
                          "size-7 text-pink-600 transition-all duration-200 py-1"
                        }
                        delay={200}
                        animation="path-loop"
                        initialOnAnimateEnd
                        animateOnView
                      />
                    )}
                    <p className="pb-1 pr-1 text-md text-neutral-700 duration-200 transition-all">
                      {likesCount}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-neutral-400"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostCard;
