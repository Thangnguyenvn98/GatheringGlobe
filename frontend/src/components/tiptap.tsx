import { StarterKit } from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./toolbar";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";

interface TiptapProps {
  description: string;
  onChange: (value: string) => void;
  width?: string;
}

const Tiptap: React.FC<TiptapProps> = ({
  description,
  onChange,
  width = "400px",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({
        HTMLAttributes: { class: "font-bold text-xl" },
        levels: [2],
      }),
      Underline,
    ],
    content: description,
    editorProps: {
      attributes: {
        class: `prose [&_ol]:list-decimal [&_ul]:list-disc rounded-md border min-h-[300px] border-input p-2`,
        style: `min-width:${width}`,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="flex flex-col min-h-[250px] gap-y-4 w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
