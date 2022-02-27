import { Button, TextField } from '@lifelog/ui';
import { Profile } from '@prisma/client';
import { format } from 'date-fns';
import { gql } from 'graphql-request';
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  useParams,
  useSearchParams,
} from 'remix';
import { useActionData, useLoaderData, redirect } from 'remix';
import { client } from '~/lib/graphql-client';
import { getUserSession, gqlRequest, requireUserSession } from '~/session';

// Provide meta tags for this page.
// - https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return { title: 'Lifelog | Profile' };
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

interface LoaderData {
  profile: Profile | null;
}

// Use this function to provide data for the route.
// - https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const session = await requireUserSession(request);
  const userId = session.get('userId');
  let profile = null;
  try {
    const data = await gqlRequest(request, ProfileQuery, { userId });
    profile = data.profile;
  } catch (err) {
    console.log({ err });
  }

  return {
    profile,
  };
};

const UpdateProfileMutation = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(profile: $input) {
      bio
      birthDate
      name
    }
  }
`;

export const action: ActionFunction = async (args) => {
  const { request } = args;
  const session = await getUserSession(request);
  const userId = session.get('userId');
  const body = await request.formData();
  const redirectTo = body.get('redirectTo') as string;
  const name = body.get('name');
  const birthDate = body.get('birthDate');
  const bio = body.get('bio');

  /** @todo validate with invariant */
  /** @todo server error handling */

  await gqlRequest(request, UpdateProfileMutation, {
    input: {
      userId,
      name,
      bio,
      birthDate: new Date(birthDate as string).toISOString(),
    },
  });

  return redirect(redirectTo);
};

export default function ProfileRoute() {
  const { profile } = useLoaderData();
  const [params] = useSearchParams();
  const redirectTo = params.get('redirectTo') || '/';

  const { name, birthDate, bio } = {
    name: profile?.name,
    birthDate:
      profile?.birthDate &&
      format(new Date(parseInt(profile.birthDate)), 'yyyy-MM-dd'),
    bio: profile?.bio,
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Profile
        </h2>
        <Form method="post" className="mt-8 space-y-6">
          <div>
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <TextField
              name="name"
              placeholder="Name"
              defaultValue={name}
              fullWidth={true}
            />
          </div>
          {/** @todo add date picker */}
          <div>
            <TextField
              name="birthDate"
              placeholder="Birth date: EG: 1990-10-10"
              fullWidth={true}
              defaultValue={birthDate}
            />
          </div>
          <div>
            {/** @todo create textarea component */}
            <TextField
              name="bio"
              placeholder="Bio"
              defaultValue={bio}
              fullWidth={true}
            />
          </div>
          <div>
            <Button type="submit" fullWidth={true} variant="contained">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
