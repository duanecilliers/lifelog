import { RequestDocument } from 'graphql-request';
import { createCookieSessionStorage, redirect } from 'remix';
import { client } from './lib/graphql-client';

// somewhere you've got a session storage
const { getSession } = createCookieSessionStorage();

const storage = createCookieSessionStorage({
  cookie: {
    name: 'lifelog_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: ['mmysuperdupersecretphrase'],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function requireUserSession(request: Request) {
  const session = await getUserSession(request);
  if (!session.has('token')) {
    throw redirect('/login');
  }
  return session;
}

export async function userHasToken(request: Request) {
  const session = await getUserSession(request);
  console.log({ session }, session.has('token'));
  return session.has('token');
}

export async function createUserSession(
  access_token: string,
  userId: number,
  redirectTo: string
) {
  try {
    const session = await storage.getSession();
    session.set('token', access_token);
    session.set('userId', userId);
    /**
     * @todo implement refresh tokens
     */
    // if (payload.refreshToken) {
    //   session.set('refreshToken', payload.refreshToken);
    // }
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await storage.commitSession(session),
      },
    });
  } catch (error) {
    throw error;
  }
}

type Variables = {
  [key: string]: any;
};
export async function gqlRequest<V = Variables>(
  request: Request,
  document: RequestDocument,
  variables?: V
) {
  const session = await getUserSession(request);
  const token = session.get('token');
  return await client.request(document, variables, {
    Authorization: `Bearer ${token}`,
  });
}
