import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id: postId } = await params;
  const user = await getCurrentUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { content } = body;
  if (!content?.trim()) {
    return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: { content, authorId: user.id, postId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });
  return NextResponse.json(comment);
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id: postId } = await params;

  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });
  return NextResponse.json(comments);
}
