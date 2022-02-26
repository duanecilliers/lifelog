import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { splitEvery, map, add } from 'ramda';
import { differenceInYears } from 'date-fns';
import { Button } from '@lifelog/ui';
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
  // const age = 31;
  const years = [...Array(100).keys()];
  const groupedYears = splitEvery(10, map(add(1), years));
  return (
    <div className="p-2 w-screen h-screen flex flex-col items-stretch">
      {groupedYears.map((row, i) => (
        <div
          key={`row-${i}`}
          className="px-2 grid grid-cols-10 flex-1 space-x-1"
        >
          {row.map((year) => (
            <Link
              key={`age-${year}`}
              to={`/age/${year}`}
              className={`my-0.5 text-sm text-center ${
                age > year && ` bg-gray-100 text-gray-400`
              }
                ${age < year && ` bg-gray-200 text-gray-800`}
                ${true && ` bg-blue-400 text-white`}`}
            >
              {year}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
