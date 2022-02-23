import { Story, Meta } from '@storybook/react';
import { Button } from './button';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'My Button',
};
