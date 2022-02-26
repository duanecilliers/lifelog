import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { splitEvery, map, add } from 'ramda';
import { Button } from '@lifelog/ui';
import { requireUserSession } from '~/session';

type IndexData = {};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);
  return null;
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
  // let data = useLoaderData<IndexData>();
  const age = 31;
  const years = [...Array(100).keys()];
  const groupedYears = splitEvery(10, map(add(1), years));
  return (
    <div className="p-2 w-screen h-screen flex flex-col items-stretch">
      {groupedYears.map((row) => (
        <div className="px-2 grid grid-cols-10 flex-1 space-x-1">
          {row.map((year) => (
            <button
              className={`my-0.5 text-sm text-center ${
                age > year && ` bg-gray-100 text-gray-400`
              }
                ${age < year && ` bg-gray-200 text-gray-800`}
                ${true && ` bg-blue-400 text-white`}`}
            >
              {year}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
