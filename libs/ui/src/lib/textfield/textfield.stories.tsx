import { Story, Meta } from '@storybook/react';
import { TextField } from './textfield';

export default {
  component: TextField,
  title: 'TextField',
} as Meta;

const Template: Story = ({ ...args }) => (
  <TextField name="my-input" {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: 'my-input',
};
