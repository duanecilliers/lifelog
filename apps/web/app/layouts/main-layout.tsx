import { Header } from '@lifelog/ui';
import { format } from 'date-fns';
import { NavLink } from 'remix';

const currentDate = format(new Date(), 'yyyy-MM-dd');
const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Calendar', href: '/calendar', current: false },
  { name: 'Journal', href: `/journal/${currentDate}`, current: false },
];

const profileMenuItems = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '/signout' },
];

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function MainLayout({ children, showHeader = true }: MainLayoutProps) {
  return (
    <>
      {showHeader && (
        <Header
          className="fixed w-full"
          navigation={navigation}
          profileMenuItems={profileMenuItems}
          linkElement={NavLink}
        />
      )}
      <div className="max-w-7xl mx-auto h-full" style={{ paddingTop: '64px' }}>
        {children}
      </div>
    </>
  );
}

export default MainLayout;
