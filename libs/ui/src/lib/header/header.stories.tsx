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
    { name: 'Dashboard', href: '#' },
    { name: 'Calendar', href: '#' },
    { name: 'Journal', href: '#' },
  ],
  profileMenuItems: [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ],
};
