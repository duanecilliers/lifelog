import { useEffect, useRef } from 'react';
import { LoaderFunction, MetaFunction, useParams } from 'remix';
import { useActionData, useLoaderData, redirect } from 'remix';

// Provide meta tags for this page.
// - https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return { title: 'AgeView' };
};

// Use this function to provide data for the route.
// - https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async () => {
  return {
    message: 'Hello, world!',
  };
};

export default function AgeView() {
  const data = useLoaderData();
  const { age } = useParams();
  return <p>Age: {age}</p>;
}
