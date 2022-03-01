import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  useSubmit,
  redirect,
  useActionData,
} from 'remix';
import { Descendant, Node } from 'slate';
import { TextEditor, BlockButton, MarkButton } from '@lifelog/ui';
import MainLayout from '~/layouts/main-layout';
import { getUserSession, gqlRequest, requireUserSession } from '~/session';
import { format } from 'date-fns';
import { gql } from 'graphql-request';

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

const CreateJournalEntryMutation = gql`
  mutation createJournalEntry($input: JournalEntryCreateInput!) {
    createJournalEntry(journalEntry: $input) {
      date
      id
      json
      userId
    }
  }
`;

const UpdateJournalEntryMutation = gql`
  mutation updateJournalEntry($input: JournalEntryUpdateInput!) {
    updateJournalEntry(updateJournalEntry: $input) {
      date
      id
      json
      userId
    }
  }
`;

export const action: ActionFunction = async (args) => {
  const { request } = args;
  const session = await getUserSession(request);
  const userId = session.get('userId');
  const body = await request.formData();
  const value = body.get('value') as string;
  const journalEntryId = body.get('journalEntryId') as string;
  console.log('journalEntryId', journalEntryId);

  if (journalEntryId === 'undefined') {
    console.log('creating new journal entry.....');
    const data = await gqlRequest(request, CreateJournalEntryMutation, {
      input: {
        date: new Date().toISOString(),
        json: JSON.parse(value),
        userId,
      },
    });
    const { id, date, json } = data?.createJournalEntry;
    return { id, date, json, userId };
  } else {
    console.log('updating journal entry.........');
    const data = await gqlRequest(request, UpdateJournalEntryMutation, {
      input: {
        id: parseInt(journalEntryId),
        json: JSON.parse(value),
      },
    });
    const { id, date, json } = data?.updateJournalEntry;
    return { id, date, json, userId };
  }
};

// https://remix.run/guides/routing#index-routes
export default function Journal() {
  const submit = useSubmit();
  const title = format(Date.now(), 'MMMM do, yyyy');
  const data = useActionData();
  const journalEntryId = data?.id;

  const handleSave = (value: Descendant[]) => {
    submit(
      { value: JSON.stringify(value), data, journalEntryId },
      { method: 'post', replace: true }
    );
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
            className="form-input px-4 py-3 border-4 border-dashed border-gray-200 transition-all"
            onSave={handleSave}
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
