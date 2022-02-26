import { ActionFunction, Form, LoaderFunction, MetaFunction } from 'remix';
import { redirect } from 'remix';
import { gql } from 'graphql-request';
import { TextField, Button } from '@lifelog/ui';
import { client } from '~/lib/graphql-client';
import { createUserSession, userHasToken } from '~/session';

// Provide meta tags for this page.
// - https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return { title: 'AppsWebAppRoutesLogin' };
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

const LoginMutation = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
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
    login: { access_token },
  } = await client.request(LoginMutation, {
    input: { email, password },
  });
  return createUserSession(access_token, redirectTo);
};

export default function AppsWebAppRoutesLogin() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            start your 14-day free trial
          </a>
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
  );
}
