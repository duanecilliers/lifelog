import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  MetaFunction,
} from 'remix';
import { redirect } from 'remix';
import { gql } from 'graphql-request';
import { TextField, Button } from '@lifelog/ui';
import { client } from '~/lib/graphql-client';
import { createUserSession, userHasToken } from '~/session';
import MainLayout from '~/layouts/main-layout';

// Provide meta tags for this page.
// - https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return { title: 'Lifelog | Signunp' };
};

// Use this function to provide data for the route.
// - https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async ({ request }) => {
  const hasToken = await userHasToken(request);
  if (hasToken) {
    return redirect('/');
  }
  return null;
};

const SignupMutation = gql`
  mutation signup($input: LoginUserInput!) {
    signup(loginUserInput: $input) {
      user {
        id
        email
      }
      access_token
    }
  }
`;

export const action: ActionFunction = async (args) => {
  const { request } = args;
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');
  const redirectTo = body.get('redirectTo')?.toString() || '/';
  /**
   * @todo handle validation with invariant and Joi?
   * @link https://github.com/alexreardon/tiny-invariant
   */
  const {
    signup: { access_token, user },
  } = await client.request(SignupMutation, {
    input: { email, password },
  });
  return createUserSession(access_token, user.id, redirectTo);
};

export default function SignupRoute() {
  return (
    <MainLayout showHeader={false}>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Start your 14-day free trial
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              login to your account
            </Link>
          </p>
          <Form method="post" className="mt-8 space-y-6">
            <div>
              <TextField name="email" placeholder="Email" fullWidth={true} />
            </div>
            <div>
              <TextField
                type="password"
                name="password"
                placeholder="Password"
                fullWidth={true}
              />
            </div>
            <div>
              <Button type="submit" fullWidth={true} variant="contained">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
}
