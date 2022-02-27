import { MetaFunction, LoaderFunction, Outlet } from 'remix';
import MainLayout from '~/layouts/main-layout';
import { requireUserSession } from '~/session';

type LoaderData = {};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
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
export default function Age() {
  return (
    <MainLayout>
      <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Week Calendar
        </h1>
      </header>
      <main>
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </MainLayout>
  );
}
