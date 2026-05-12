import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("HEADERS:", req.headers);
  const user = await getCurrentUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { title, content, authorId: user.id },
  });

  return NextResponse.json(post);
}

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req);

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      ...(user && {
        likes: {
          select: {
            userId: true,
          },
        },
      }),
    },
  });

  if (!user) {
    return NextResponse.json(posts);
  }
  const transformedPosts = posts.map((post) => ({
    ...post,
    likedByCurrentUser: post.likes.some((like) => like.userId == user.id),
  }));
  return NextResponse.json(transformedPosts);
}
