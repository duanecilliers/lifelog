import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';

type IndexData = {};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
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

  return <div>Lifelog App</div>;
}
