import { Story, Meta } from '@storybook/react';
import { Header, HeaderProps } from './header';

export default {
  component: Header,
  title: 'Header',
} as Meta;

const Template: Story = ({ ...args }: HeaderProps) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  navigation: [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Journal', href: '#', current: false },
  ],
  profileMenuItems: [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ],
};
