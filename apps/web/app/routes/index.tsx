import { Button } from '@lifelog/ui';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
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
    title: 'Lifelog',
    description: 'Welcome to Lifelog!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  // let data = useLoaderData<IndexData>();

  return (
    <div>
      <h1>Lifelog App</h1>
      <Button>Button from the UI Lib</Button>
    </div>
  );
}
