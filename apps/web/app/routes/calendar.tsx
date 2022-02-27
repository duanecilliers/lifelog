import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { differenceInYears } from 'date-fns';
import { LifeCalendar } from '@lifelog/ui';
import { gqlRequest, requireUserSession } from '~/session';
import { gql } from 'graphql-request';

type CalendarData = {
  age: number | null;
};

/**
 * @todo abstract reusable queries
 */
const ProfileQuery = gql`
  query profile($userId: Float!) {
    profile(userId: $userId) {
      id
      name
      bio
      birthDate
    }
  }
`;

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({
  request,
}): Promise<CalendarData> => {
  const session = await requireUserSession(request);
  const userId = session.get('userId');

  try {
    const { profile } = await gqlRequest(request, ProfileQuery, { userId });
    const birthDate =
      profile?.birthDate && new Date(parseInt(profile?.birthDate));
    const age = birthDate && differenceInYears(Date.now(), birthDate);

    return {
      age,
    };
  } catch (err) {
    console.log({ err });
    return { age: null };
  }
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Lifelog | Track, Reflect & Grow',
    description: 'Track, Reflect & Grow',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Calendar() {
  let { age } = useLoaderData<CalendarData>();
  return (
    <>
      <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Life Calendar
        </h1>
      </header>
      <div className="max-w-4xl mx-auto">
        {age ? (
          <LifeCalendar age={age} linkElement={Link} />
        ) : (
          <p className="text-center">
            You haven't completed your profile yet. You can{' '}
            <Link
              className="text-blue-400"
              to={`/profile?redirectTo=${encodeURIComponent('/calendar')}`}
            >
              update your profile here.
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
