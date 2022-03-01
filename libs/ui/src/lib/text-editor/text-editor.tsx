import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { equals } from 'ramda';
import {
  createEditor,
  BaseEditor,
  Descendant,
  Transforms,
  Editor,
  Element as SlateElement,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor, useSlate } from 'slate-react';
import { Toolbar, ButtonControl, Icon } from './components';

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
  initialValue?: Descendant[];
  className?: string;
  focus?: boolean;
  Controls?: ReactNode[];
  autoSave?: boolean;
  autoSaveDelay?: number;
  onSave?: (value: Descendant[]) => void;
  onChange?: (value: Descendant[]) => void;
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const defaultInitialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export function TextEditor({
  className,
  Controls = [],
  initialValue = defaultInitialValue,
  focus = false,
  autoSave = true,
  autoSaveDelay = 10,
  onSave,
  onChange,
}: TextEditorProps) {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => {
    return withReact(createEditor());
  }, []);

  const handleChange = (values: Descendant[]): void => {
    setValue(values);
    if (onChange) {
      const isAstChange = editor.operations.some(
        (op) => 'set_selection' !== op.type
      );
      if (isAstChange) {
        onChange(values);
      }
    }
  };

  const handleSave = useCallback(() => {
    if (onSave && !equals(initialValue, value)) {
      const isAstChange = editor.operations.some(
        (op) => 'set_selection' !== op.type
      );
      if (isAstChange) {
        onSave(value);
      }
      onSave(value);
    }
  }, [onSave, value, editor.operations, initialValue]);

  useEffect(() => {
    if (focus) {
      ReactEditor.focus(editor);
    }
  }, [editor, focus]);

  /**
   * Save entry every 10 seconds
   */
  useEffect(
    () => {
      const timer1 = setTimeout(() => {
        if (autoSave) {
          handleSave();
        }
      }, autoSaveDelay * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [handleSave, autoSaveDelay, autoSave]
  );

  return (
    <div className={className}>
      <Slate editor={editor} value={value} onChange={handleChange}>
        {Controls.length > 0 && <Toolbar>{Controls}</Toolbar>}
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onBlur={handleSave}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <ButtonControl
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </ButtonControl>
  );
};

export const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <ButtonControl
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </ButtonControl>
  );
};

export default TextEditor;
