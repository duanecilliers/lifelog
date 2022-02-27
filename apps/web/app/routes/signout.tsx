import type { MetaFunction, LoaderFunction } from 'remix';
import { signoutOfSession } from '~/session';

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  return await signoutOfSession(request);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Lifelog | Signout',
    description: 'Sign out of account',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Signing out...
      </h1>
    </header>
  );
}
