"use client";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { MessageSquareText } from "@/components/animate-ui/icons/message-square-text";
import { EllipsisVertical, HeartIcon } from "lucide-react";
import { useState } from "react";
import PostContent from "./PostContent";

interface PostCard {
  fullName: string;
  userName?: string;
  profile_img?: string;
  title: string;
  content: string;
  comments?: number;
  likes?: number;
}

const PostCard = ({
  fullName,
  userName,
  profile_img,
  title,
  content,
  comments,
  likes,
}: PostCard) => {
  const [like, setLike] = useState<boolean>(false);
  return (
    <>
      <div className="h-px w-full bg-neutral-400"></div>
      <div className=" w-full py-4 flex gap-2 hover:bg-neutral-400/10 px-4 my-2 rounded-md">
        <div className="h-full">
          <div className="size-10 rounded-full bg-linear-to-tl from-green-600 to-lime-400"></div>
        </div>
        <div className="flex flex-col justify-between gap-6 h-full ">
          <div className="flex w-full justify-between ">
            <div className="flex gap-4">
              <div className="flex flex-col ">
                <p>{fullName}</p>
                <p className="text-sm font-semibold -mt-1 hover:text-green-800 hover:underline cursor-pointer">
                  @{userName}
                </p>
              </div>
              <div>
                <button className="px-4 py-1 border border-transparent bg-cyan-500 cursor-pointer text-white text-sm font-semibold rounded-sm  hover:border hover:border-cyan-400 hover:bg-white hover:text-cyan-500 active:inset-shadow-sm active:inset-shadow-cyan-600 transition-all duration-200">
                  Follow
                </button>
              </div>
            </div>
            <div>
              <button className="px-2 py-2 rounded-full hover:bg-neutral-400/10 shadow-2xl/5 cursor-pointer">
                <EllipsisVertical className="size-5" />
              </button>{" "}
            </div>
          </div>
          <div className="text-sm pr-4 tracking-tight">
            <h1 className=" font-bold text-neutral-700">{title}</h1>
            <br />
            <p className="line-clamp-8 text-balance text-neutral-800 leading-6">
              
            </p>
            <PostContent content={content}/>
          </div>
          <div className="w-full text-neutral-700 flex gap-2">
            <button className="flex cursor-pointer group">
              <AnimateIcon
                animateOnHover
                className=" rounded-md text-sm  flex justify-center items-center gap-1 p-1 duration-200 transition-all"
              >
                <MessageSquareText
                  className={
                    "size-7 stroke-1 py-1 group-hover:bg-sky-200 group-hover:text-sky-600 rounded-sm duration-200 transition-all"
                  }
                />
                <p className="pb-1 pr-1 text-md text-neutral-700 duration-200 transition-all">
                  {comments}
                </p>
              </AnimateIcon>
            </button>
            <button
              onClick={(e) => setLike((p) => !p)}
              className="flex cursor-pointer group"
            >
              <div className="rounded-md text-sm  flex justify-center items-center gap-1 p-1 duration-200 transition-all">
                <HeartIcon
                  className={`size-7 stroke-1 py-1 group-hover:bg-pink-200 group-hover:scale-105  group-hover:text-pink-500 rounded-sm duration-200 transition-all ${like && "fill-pink-500 text-pink-500 "}`}
                />
                <p className="pb-1 pr-1 text-md text-neutral-700 duration-200 transition-all">
                  {likes}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-neutral-400"></div>
    </>
  );
};

export default PostCard;
