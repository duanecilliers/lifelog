import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { differenceInYears } from 'date-fns';
import { LifeCalendar } from '@lifelog/ui';
import { requireUserSession } from '~/session';
import MainLayout from '~/layouts/main-layout';

type IndexData = {};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }): Promise<IndexData> => {
  await requireUserSession(request);
  const dateOfBirth = new Date('1990-10-10');
  const age = differenceInYears(Date.now(), dateOfBirth);
  console.log({ age });

  return {
    age,
  };
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Lifelog | Track, Reflect & Grow',
    description: 'Track, Reflect & Grow',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <MainLayout>
      <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Dashboard
        </h1>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </MainLayout>
  );
}
