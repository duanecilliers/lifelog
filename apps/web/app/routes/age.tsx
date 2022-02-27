import { MetaFunction, LoaderFunction, Outlet } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { differenceInYears } from 'date-fns';
import { LifeCalendar } from '@lifelog/ui';
import { requireUserSession } from '~/session';

type AgeData = {};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }): Promise<AgeData> => {
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
export default function Age() {
  return (
    <>
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
    </>
  );
}
