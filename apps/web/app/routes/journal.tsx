import { MetaFunction, LoaderFunction, Outlet } from 'remix';
import MainLayout from '~/layouts/main-layout';
import { requireUserSession } from '~/session';

type JournalData = {};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({
  request,
}): Promise<JournalData> => {
  return await requireUserSession(request);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Lifelog | Track, Reflect & Grow',
    description: 'Track, Reflect & Grow',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Journal() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
