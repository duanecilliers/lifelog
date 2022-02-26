import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { differenceInYears } from 'date-fns';
import { LifeCalendar } from '@lifelog/ui';
import { requireUserSession } from '~/session';

type IndexData = {
  age: number;
};

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
  let { age } = useLoaderData<IndexData>();
  return (
    <div className="p-2 w-screen h-screen flex flex-col items-stretch">
      <h1 className="text-lg font-bold mb-1">My life in years</h1>
      <LifeCalendar age={age} linkElement={Link} />
    </div>
  );
}
