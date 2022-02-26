import { Story, Meta } from '@storybook/react';
import { WeekCalendar } from './week-calendar';

export default {
  component: WeekCalendar,
  title: 'WeekCalendar',
} as Meta;

const Template: Story = ({ weeks, year, ...args }) => (
  <WeekCalendar year={year} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  year: '2022',
};
