import { Story, Meta } from '@storybook/react';
import { LifeCalendar } from './life-calendar';

export default {
  component: LifeCalendar,
  title: 'LifeCalendar',
} as Meta;

const Template: Story = ({ age, ...args }) => (
  <LifeCalendar age={age} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  age: 31,
};
