import { useEffect, useRef } from 'react';
import {
  LoaderFunction,
  useLoaderData,
  MetaFunction,
  useParams,
  Link,
  ActionFunction,
  useActionData,
  useSubmit,
} from 'remix';
import { TextEditor, BlockButton, MarkButton } from '@lifelog/ui';
import { gql } from 'graphql-request';
import { getUserSession, gqlRequest } from '~/session';
import { Descendant } from 'slate';
import { addDays, format, subDays } from 'date-fns';

// Provide meta tags for this page.
// - https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  const { journalDate } = useParams();
  return { title: `Journal Entry | ${journalDate}` };
};

interface LoaderData {
  journalEntry: any;
  initialValue: Descendant[];
}

const dateFormat = 'yyyy-MM-dd';

// Use this function to provide data for the route.
// - https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async (args): Promise<LoaderData> => {
  const { request } = args;
  const { journalDate = format(Date.now(), dateFormat) } = args.params;
  let journalEntry = null;
  try {
    const _journal = await gqlRequest(request, GetJournalEntryByDate, {
      date: format(new Date(journalDate), dateFormat),
    });
    journalEntry = _journal?.journalEntryByDay;
  } catch (err) {
    console.log(
      '🚀 ~ file: $journalDate.tsx ~ line 40 ~ constloader:LoaderFunction= ~ err',
      err
    );
  }

  const initialValue = journalEntry?.json || [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  return {
    journalEntry,
    initialValue,
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

const GetJournalEntryByDate = gql`
  query journalEntryByDay($date: DateTime!) {
    journalEntryByDay(date: $date) {
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
  const journalDate = body.get('journalDate') as string;

  let journal = null;
  try {
    journal = await gqlRequest(request, GetJournalEntryByDate, {
      date: format(new Date(journalDate), dateFormat),
    });
  } catch (err) {
    console.log(
      '🚀 ~ file: $journalDate.tsx ~ line 82 ~ constaction:ActionFunction= ~ err',
      err
    );
  }

  if (journal === null) {
    console.log('creating new journal entry.....');
    const data = await gqlRequest(request, CreateJournalEntryMutation, {
      input: {
        date: format(new Date(journalDate), dateFormat),
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

export default function JournalDate() {
  const submit = useSubmit();
  const { journalDate } = useParams();
  const prevDate = format(
    subDays(new Date(journalDate as string), 1),
    dateFormat
  );
  const nextDate = format(
    addDays(new Date(journalDate as string), 1),
    dateFormat
  );
  const { journalEntry, initialValue } = useLoaderData();
  console.log(
    '🚀 ~ file: $journalDate.tsx ~ line 144 ~ JournalDate ~ journal',
    journalEntry
  );
  const title = format(new Date(journalDate as string), 'MMMM do, yyyy');
  const data = useActionData();
  const journalEntryId = journalEntry?.id || data?.id;

  const handleSave = (value: Descendant[]) => {
    submit(
      {
        value: JSON.stringify(value),
        data,
        journalEntryId,
        journalDate: journalDate || format(new Date(), dateFormat),
      },
      { method: 'post', replace: true }
    );
  };

  return (
    <>
      <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex align-center justify-between">
        <Link to={`/journal/${prevDate}`} className="p-2">
          <span className="material-icons">arrow_left</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          {title}
        </h1>
        <Link to={`/journal/${nextDate}`} className="p-2">
          <span className="material-icons">arrow_right</span>
        </Link>
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
            initialValue={initialValue}
          />
        </div>
      </main>
    </>
  );
}
