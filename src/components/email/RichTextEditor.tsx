"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useRef } from 'react';
import { Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, Paperclip, X } from 'lucide-react';

export interface Attachment {
  name: string;
  type: string;
  size: number;
  base64: string;
}

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  attachments: Attachment[];
  onAttachmentsChange: (attachments: Attachment[]) => void;
}

export default function RichTextEditor({ content, onChange, attachments, onAttachmentsChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = [];
    let hasError = false;

    Array.from(files).forEach((file) => {
      // 3MB limit
      if (file.size > 3 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 3MB.`);
        hasError = true;
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          // extract base64 part
          const base64 = result.split(',')[1];
          onAttachmentsChange([...attachments, {
            name: file.name,
            type: file.type,
            size: file.size,
            base64
          }]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    onAttachmentsChange(newAttachments);
  };

  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden flex flex-col focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        <EditorContent editor={editor} />
      </div>
      
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t border-line/50 flex flex-wrap gap-2 bg-bg/50">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-surface border border-line px-3 py-1.5 rounded-lg text-[12px] text-text">
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button 
                type="button" 
                onClick={() => removeAttachment(index)}
                className="text-muted hover:text-text transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1 border-t border-line px-2 py-2 bg-bg/30">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-line text-text' : 'text-muted hover:bg-line/50 hover:text-text'}`}
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-line text-text' : 'text-muted hover:bg-line/50 hover:text-text'}`}
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('underline') ? 'bg-line text-text' : 'text-muted hover:bg-line/50 hover:text-text'}`}
        >
          <UnderlineIcon size={18} />
        </button>
        
        <div className="w-[1px] h-6 bg-line mx-1" />

        <button
          type="button"
          onClick={toggleLink}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-line text-text' : 'text-muted hover:bg-line/50 hover:text-text'}`}
        >
          <LinkIcon size={18} />
        </button>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg text-muted hover:bg-line/50 hover:text-text transition-colors flex items-center gap-2 text-[13px] font-medium"
        >
          <Paperclip size={18} />
          <span className="hidden sm:inline">Attach</span>
        </button>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          multiple 
        />
      </div>
    </div>
  );
}
