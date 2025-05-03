import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, List, ListOrdered, Link as LinkIcon, 
  Image as ImageIcon, Heading1, Heading2, Quote, 
  AlignLeft, AlignCenter, AlignRight, Code, Undo, Redo
} from 'lucide-react';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const toggleFormat = (format: string) => {
    switch (format) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'bullet-list':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'ordered-list':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'code':
        editor.chain().focus().toggleCode().run();
        break;
      case 'align-left':
        editor.chain().focus().setTextAlign('left').run();
        break;
      case 'align-center':
        editor.chain().focus().setTextAlign('center').run();
        break;
      case 'align-right':
        editor.chain().focus().setTextAlign('right').run();
        break;
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border-b border-neutral-200 p-2 flex flex-wrap gap-1 bg-neutral-50">
      <div className="flex items-center gap-1 border-r border-neutral-200 pr-2 mr-2">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded hover:bg-neutral-100 ${
            !editor.can().undo() ? 'opacity-50 cursor-not-allowed' : 'text-neutral-700'
          }`}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded hover:bg-neutral-100 ${
            !editor.can().redo() ? 'opacity-50 cursor-not-allowed' : 'text-neutral-700'
          }`}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r border-neutral-200 pr-2 mr-2">
        <button
          onClick={() => toggleFormat('bold')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('bold') ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleFormat('italic')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('italic') ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleFormat('code')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('code') ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Code"
        >
          <Code className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r border-neutral-200 pr-2 mr-2">
        <button
          onClick={() => toggleFormat('h1')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleFormat('h2')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r border-neutral-200 pr-2 mr-2">
        <button
          onClick={() => toggleFormat('bullet-list')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('bulletList') ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleFormat('ordered-list')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('orderedList') ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleFormat('blockquote')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('blockquote') ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r border-neutral-200 pr-2 mr-2">
        <button
          onClick={() => toggleFormat('align-left')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleFormat('align-center')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleFormat('align-right')}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('link') ? 'bg-neutral-100 text-primary-600' : 'text-neutral-700'
          }`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-neutral-100 text-neutral-700"
          title="Add Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder = 'Write something...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary-600 hover:text-primary-700 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-neutral-300 rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none p-4 min-h-[200px]" />
    </div>
  );
};

export default RichTextEditor; 