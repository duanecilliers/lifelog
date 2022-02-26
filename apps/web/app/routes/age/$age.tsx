import { useEffect, useRef } from 'react';
import {
  LoaderFunction,
  useLoaderData,
  MetaFunction,
  useParams,
  Link,
} from 'remix';
import { WeekCalendar } from '@lifelog/ui';

// Provide meta tags for this page.
// - https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return { title: 'AgeView' };
};

// Use this function to provide data for the route.
// - https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async () => {
  return {
    message: 'Hello, world!',
  };
};

export default function AgeView() {
  const data = useLoaderData();
  const { age } = useParams();
  return (
    <div className="p-2 w-screen h-screen flex flex-col items-stretch">
      <h1 className="text-lg font-bold mb-1">Weeks in: {age}</h1>
      <WeekCalendar year="2022" linkElement={Link} />
    </div>
  );
}
