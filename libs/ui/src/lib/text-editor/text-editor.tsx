import { useMemo, useState } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string; bold?: true };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

/* eslint-disable-next-line */
export interface TextEditorProps {
  className?: string;
  initialValue: Descendant[];
}

export function TextEditor({ className, initialValue }: TextEditorProps) {
  const editor = useMemo(() => {
    return withReact(createEditor());
  }, []);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  return (
    <div className={className}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable />
      </Slate>
    </div>
  );
}

export default TextEditor;
