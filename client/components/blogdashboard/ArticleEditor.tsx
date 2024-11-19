


import React, { useEffect } from 'react'
import { useEditor, EditorContent, useCurrentEditor, EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';

import { FaBold, FaItalic, FaUnderline, FaHeading } from "react-icons/fa";
import classNames from 'classnames';
interface TextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const ArticleEditor: React.FC<TextEditorProps> = ({ content, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="text-editor">
      {/* Toolbar */}
      <div className="flex">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={classNames(
          "bg-black text-white px-4 py-1 rounded flex space-x-2 items-center",
          editor.isActive("bold") && "bg-red-600"
        )}
      >
        <FaBold /> <div>Bold</div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={classNames(
          "bg-black text-white px-4 py-1 rounded flex space-x-2 items-center",
          editor.isActive("italic") && "bg-red-600"
        )}
      >
        <FaItalic /> <div>Italic</div>
      </button>
    
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={classNames(
          "bg-black text-white px-4 py-1 rounded flex space-x-2 items-center",
          editor.isActive("heading", { level: 1 }) && "bg-red-600"
        )}
      >
        <FaHeading /> <div>H1</div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={classNames(
          "bg-black text-white px-4 py-1 rounded flex space-x-2 items-center",
          editor.isActive("heading", { level: 2 }) && "bg-red-600"
        )}
      >
        <FaHeading /> <div>H2</div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={classNames(
          "bg-black text-white px-4 py-1 rounded flex space-x-2 items-center",
          editor.isActive("heading", { level: 3 }) && "bg-red-600"
        )}
      >
        <FaHeading /> <div>H3</div>
      </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default ArticleEditor;
