"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor({ onChange }: { onChange: (content: any) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing...</p>",
    onUpdate({ editor }) {
      onChange(editor.getJSON()); // 👈 IMPORTANT
    },
    immediatelyRender:false,
  });

  return (
    <div className="border rounded-md p-3 min-h-37.5">
      <EditorContent editor={editor} />
    </div>
  );
}