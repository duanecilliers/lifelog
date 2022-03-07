import { Story, Meta } from '@storybook/react';
import {
  MarkButton,
  BlockButton,
  TextEditor,
  TextEditorProps,
} from './text-editor';

export default {
  component: TextEditor,
  title: 'TextEditor',
} as Meta;

const Template: Story = ({ ...args }: TextEditorProps) => (
  <TextEditor {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  initialValue: [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ],
};

export const RichEditor = Template.bind({});
RichEditor.args = {
  initialValue: [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ],
  Controls: [
    <MarkButton format="bold" icon="format_bold" />,
    <MarkButton format="italic" icon="format_italic" />,
    <MarkButton format="underline" icon="format_underlined" />,
    <MarkButton format="code" icon="code" />,
    <BlockButton format="heading-one" icon="looks_one" />,
    <BlockButton format="heading-two" icon="looks_two" />,
    <BlockButton format="block-quote" icon="format_quote" />,
    <BlockButton format="numbered-list" icon="format_list_numbered" />,
    <BlockButton format="bulleted-list" icon="format_list_bulleted" />,
  ],
};
