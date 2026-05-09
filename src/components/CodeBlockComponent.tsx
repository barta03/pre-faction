import React from "react";

import {
  NodeViewContent,
  NodeViewWrapper,
  type NodeViewProps,
} from "@tiptap/react";

import { CodeXml, Copy } from "lucide-react";

const CodeBlockComponent = ({
  node,
  updateAttributes,
  extension,
  editor,
}: NodeViewProps) => {
  const defaultLanguage = node.attrs.language;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(node.textContent);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <NodeViewWrapper className="code-block overflow-hidden rounded-lg border border-neutral-700 my-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-neutral-700 bg-neutral-900 px-3 py-2">
        {/* Left */}
        <span className="flex items-center gap-1 text-xs uppercase text-neutral-400">
          <CodeXml size={14} />

          {defaultLanguage || "text"}
        </span>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Editable Mode */}
          {editor.isEditable && (
            <select
              contentEditable={false}
              defaultValue={defaultLanguage}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                updateAttributes({
                  language: event.target.value,
                })
              }
              className="rounded bg-neutral-800 px-2 py-1 text-xs text-white outline-none"
            >
              <option value="null">auto</option>

              <option disabled>—</option>

              {extension.options.lowlight
                .listLanguages()
                .map((lang: string, index: number) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
            </select>
          )}

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="cursor-pointer text-neutral-400 transition-colors hover:text-white"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto bg-black p-4">
        <code>
          <NodeViewContent />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;