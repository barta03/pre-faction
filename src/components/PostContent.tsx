"use client";

import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import CodeBlockComponent from "./CodeBlockComponent";

const lowlight = createLowlight(all);

export default function PostContent({ content }: { content: any }) {
  const editor = useEditor({
    editable: false,

    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
      Image,
      TableKit.configure({
        table: { resizable: false },
      }),
     CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent)
        },
      }).configure({
        lowlight,
      }),
    ],

    content,

    immediatelyRender: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} className="tiptap" />;
}
