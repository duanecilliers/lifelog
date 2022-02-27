import type { MetaFunction, LoaderFunction } from 'remix';
import { TextEditor } from '@lifelog/ui';
import MainLayout from '~/layouts/main-layout';
import { requireUserSession } from '~/session';
import { format } from 'date-fns';

type JournalData = {};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({
  request,
}): Promise<JournalData> => {
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
export default function Journal() {
  const title = format(Date.now(), 'MMMM Mo, yyyy');
  return (
    <MainLayout>
      <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          {title}
        </h1>
      </header>
      <main>
        <div className="py-6 sm:px-6 lg:px-8">
          <TextEditor
            className="form-input px-4 py-3 border-2 border-gray-100 hover:border-gray-200 transition-all"
            initialValue={[
              {
                type: 'paragraph',
                children: [{ text: '' }],
              },
            ]}
          />
        </div>
      </main>
    </MainLayout>
  );
}
