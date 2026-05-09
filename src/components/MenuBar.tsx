import type { Editor } from "@tiptap/core";
import type { EditorStateSnapshot } from "@tiptap/react";

import { useEditorState } from "@tiptap/react";

import { menuBarStateSelector } from "@/lib/menuBarState";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) {
        return null;
      }

      return menuBarStateSelector(ctx as EditorStateSnapshot<Editor>);
    },
  });

  if (!editor || !editorState) {
    return null;
  }
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
   const tableHTML = `
  <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
`;

  return (
    <div className="control-group mb-4">
      <div className="button-group flex flex-wrap items-center gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={` ${editorState.isBold ? "is-active" : " hover:bg-neutral-400/60"}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={
            editorState.isItalic ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={
            editorState.isStrike ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={
            editorState.isCode ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          Code
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#bbf451" }).run()
          }
          // disabled={!editorState.isHighlighted}
          className={
            editor.isActive("highlight")
              ? "is-active"
              : " hover:bg-neutral-400/60"
          }
        >
          Highlight
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editorState.isParagraph ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          Paragraph
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editorState.isHeading1 ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editorState.isHeading2 ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editorState.isHeading3 ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editorState.isHeading4 ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editorState.isHeading5 ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editorState.isHeading6 ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editorState.isBulletList ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editorState.isOrderedList ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editorState.isCodeBlock ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editorState.isBlockquote ? "is-active" : " hover:bg-neutral-400/60"
          }
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          Undo
        </button>
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          Right
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          Justify
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Insert table
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent(tableHTML, {
                parseOptions: {
                  preserveWhitespace: false,
                },
              })
              .run()
          }
        >
          Insert HTML table
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!editor.can().addColumnBefore()}
        >
          Add column before
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.can().addColumnAfter()}
        >
          Add column after
        </button>
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
        >
          Delete column
        </button>
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()}
          disabled={!editor.can().addRowBefore()}
        >
          Add row before
        </button>
        <button
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!editor.can().addRowAfter()}
        >
          Add row after
        </button>
        <button
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
        >
          Delete row
        </button>
        <button
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
        >
          Delete table
        </button>
        <button
          onClick={() => editor.chain().focus().mergeCells().run()}
          disabled={!editor.can().mergeCells()}
        >
          Merge cells
        </button>
        <button
          onClick={() => editor.chain().focus().splitCell().run()}
          disabled={!editor.can().splitCell()}
        >
          Split cell
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          disabled={!editor.can().toggleHeaderColumn()}
        >
          Toggle header column
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          disabled={!editor.can().toggleHeaderRow()}
        >
          Toggle header row
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderCell().run()}
          disabled={!editor.can().toggleHeaderCell()}
        >
          Toggle header cell
        </button>
        <button
          onClick={() => editor.chain().focus().mergeOrSplit().run()}
          disabled={!editor.can().mergeOrSplit()}
        >
          Merge or split
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setCellAttribute("backgroundColor", "#FAF594")
              .run()
          }
          disabled={
            !editor.can().setCellAttribute("backgroundColor", "#FAF594")
          }
        >
          Set cell attribute
        </button>
        <button
          onClick={() => editor.chain().focus().fixTables().run()}
          disabled={!editor.can().fixTables()}
        >
          Fix tables
        </button>
        <button
          onClick={() => editor.chain().focus().goToNextCell().run()}
          disabled={!editor.can().goToNextCell()}
        >
          Go to next cell
        </button>
        <button
          onClick={() => editor.chain().focus().goToPreviousCell().run()}
          disabled={!editor.can().goToPreviousCell()}
        >
          Go to previous cell
        </button>
        <button onClick={addImage}>Add image from URL</button>
      </div>
    </div>
  );
};
