"use client";

import { MenuBar } from "./MenuBar";
import CodeBlockComponent from "./CodeBlockComponent";

import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import { TableCell, TableKit } from "@tiptap/extension-table";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
import Typography from "@tiptap/extension-typography";

// import css from "highlight.js/lib/languages/css";
// import js from "highlight.js/lib/languages/javascript";
// import ts from "highlight.js/lib/languages/typescript";
// import html from "highlight.js/lib/languages/xml";

import { all, createLowlight } from "lowlight";
const lowlight = createLowlight(all);

export default function Editor({
  onChange,
  content,
}: {
  onChange: (content: any) => void;
  content?: any;
}) {
  const CustomTableCell = TableCell.extend({
    addAttributes() {
      return {
        // extend the existing attributes …
        ...this.parent?.(),

        // and add a new one …
        backgroundColor: {
          default: null,
          parseHTML: (element) => element.getAttribute("data-background-color"),
          renderHTML: (attributes) => {
            return {
              "data-background-color": attributes.backgroundColor,
              style: `background-color: ${attributes.backgroundColor}`,
            };
          },
        },
      };
    },
  });
  const extensions = [
    StarterKit.configure({ codeBlock: false, document: false }),
    CodeBlockLowlight.extend({
      addNodeView() {
        return ReactNodeViewRenderer(CodeBlockComponent);
      },
    }).configure({
      lowlight,
      enableTabIndentation: true,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Highlight.configure({ multicolor: true }),
    Document,

    Typography,
    Image.configure({
      resize: {
        enabled: true, // This MUST be true for handles to appear
        directions: ['top', 'bottom', 'left', 'right'],
        minWidth: 50,
        alwaysPreserveAspectRatio: true,
      },
    }),
    TableKit.configure({
      table: { resizable: true },
      tableCell: false,
    }),
    // Default TableCell
    // TableCell,
    // Custom TableCell with backgroundColor attribute
    CustomTableCell,
  ];
  const editor = useEditor(
    {
      extensions,

      autofocus: true,
      content: content || "",
      editorProps: {
        attributes: {
          // Add your padding classes here (e.g., p-4, px-8, py-12)
          class:
            "p-4 border rounded-md focus:outline-none max-h-[80vh] min-h-100 overflow-y-auto overflow-x-auto ",
        },
      },
      onUpdate({ editor }) {
        onChange(editor.getJSON()); // 👈 IMPORTANT
      },
      immediatelyRender: false,

    },
    [],
  );

  return (
    <div className=" border rounded-md p-3 min-h-37.5 ">
      <MenuBar editor={editor} />
      <EditorContent
        className="tiptap  focus:outline-none min-h-37.5 "
        editor={editor}
      />
    </div>
  );
}
