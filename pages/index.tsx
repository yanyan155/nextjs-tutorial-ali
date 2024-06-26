import React from 'react';

import { HomePage } from '../src/components/home/home-page';
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage
} from 'next';
import { ServerData, EventsCategories } from '../types';

interface Iprops {
  data: EventsCategories;
  h1text: string;
}

const Home: NextPage<Iprops> = ({ data }: Iprops) => {
  return (
    <div>
      <HomePage data={data} />
    </div>
  );
};
const fetchData = async (): Promise<ServerData> => {
  const date1 = Date.now();
  // @ts-expect-error @typescript-eslint/ban-ts-comment
  const data = await import('/data/data.json');
  const date2 = Date.now();
  console.log('import time for getServerSideProps', date2 - date1);
  return data;
};
// https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

// will not be rendered on the client
// https://next-code-elimination.vercel.app/
//  https://stackoverflow.com/questions/69559903/how-can-i-give-type-in-getserversideprops-of-nextjs-with-typescript
export const getServerSideProps: GetServerSideProps<Iprops> =
  async function (): Promise<GetServerSidePropsResult<Iprops>> {
    const { events_categories } = await fetchData();
    return {
      props: {
        data: events_categories,
        h1text: 'Welcome to the events calendar'
      }
    };
  };

export default Home;

// getInitialProps is an async function that can be added to the default exported
// React component for the page.
// It will run on both the server-side and again on the client-side during page transitions.
// The result of the function will be forwarded to the React component as props
