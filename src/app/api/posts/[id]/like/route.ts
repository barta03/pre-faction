import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Post ID missing" }, { status: 400 });
    }

    const postExists = await prisma.post.findUnique({
      where: { id},
      select: { id: true },
    });
    if (!postExists) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId: user.id, postId:id } },
    });
    let liked = false;
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      liked = false;
    } else {
      await prisma.like.create({
        data: { userId: user.id, postId:id },
      });
      liked = true;
    }

    const likesCount = await prisma.like.count({ where: { postId:id } });

    return NextResponse.json({
      liked,
      likesCount,
    });
  } catch (error) {
    console.log("LIKE_ERROR: ",error)
    return NextResponse.json({
      error:"Internal Server Error"
    },{status:500})
  }
}

