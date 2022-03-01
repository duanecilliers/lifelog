import type { MetaFunction, LoaderFunction } from 'remix';
import { Descendant, Node } from 'slate';
import { TextEditor, BlockButton, MarkButton } from '@lifelog/ui';
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

// Define a serializing function that takes a value and returns a string.
const serialize = (value: Descendant[]) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  );
};

// Define a deserializing function that takes a string and returns a value.
const deserialize = (string: string) => {
  // Return a value array of children derived by splitting the string.
  return string.split('\n').map((line) => {
    return {
      children: [{ text: line }],
    };
  });
};

// https://remix.run/guides/routing#index-routes
export default function Journal() {
  const title = format(Date.now(), 'MMMM do, yyyy');

  const handleChange = (value: Descendant[]) => {
    console.log({ value });
    // const serializedValue = serialize(value);
    // console.log({ serializedValue });
  };

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
            focus={true}
            onChange={handleChange}
            className="form-input px-4 py-3 border-4 border-dashed border-gray-200 transition-all"
            Controls={[
              <MarkButton format="bold" icon="format_bold" />,
              <MarkButton format="italic" icon="format_italic" />,
              <MarkButton format="underline" icon="format_underlined" />,
              <MarkButton format="code" icon="code" />,
              <BlockButton format="heading-one" icon="looks_one" />,
              <BlockButton format="heading-two" icon="looks_two" />,
              <BlockButton format="block-quote" icon="format_quote" />,
              <BlockButton
                format="numbered-list"
                icon="format_list_numbered"
              />,
              <BlockButton
                format="bulleted-list"
                icon="format_list_bulleted"
              />,
            ]}
            // initialValue={[
            //   {
            //     type: 'paragraph',
            //     children: [{ text: '' }],
            //   },
            // ]}
          />
        </div>
      </main>
    </MainLayout>
  );
}
