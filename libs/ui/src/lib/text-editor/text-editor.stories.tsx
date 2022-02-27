import { Story, Meta } from '@storybook/react';
import { TextEditor, TextEditorProps } from './text-editor';

export default {
  component: TextEditor,
  title: 'TextEditor',
} as Meta;

const Template: Story = ({ ...args }: TextEditorProps) => (
  <TextEditor {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
