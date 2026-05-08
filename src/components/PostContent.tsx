"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function PostContent({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false, // 🔥 important
    immediatelyRender:false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}