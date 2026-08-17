"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Your message here...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none min-h-[150px] text-[15px] p-4 text-text',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden flex flex-col focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center gap-1 border-t border-line px-2 py-2 bg-bg/30">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${editor.isActive('bold') ? 'bg-line text-text' : 'text-muted hover:bg-line/50 hover:text-text'}`}
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${editor.isActive('italic') ? 'bg-line text-text' : 'text-muted hover:bg-line/50 hover:text-text'}`}
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${editor.isActive('underline') ? 'bg-line text-text' : 'text-muted hover:bg-line/50 hover:text-text'}`}
        >
          <UnderlineIcon size={18} />
        </button>
        
        <div className="w-[1px] h-6 bg-line mx-1" />

        <button
          type="button"
          onClick={toggleLink}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${editor.isActive('link') ? 'bg-line text-text' : 'text-muted hover:bg-line/50 hover:text-text'}`}
        >
          <LinkIcon size={18} />
        </button>
      </div>
    </div>
  );
}
