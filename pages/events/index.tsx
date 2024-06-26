import React from 'react';
import AllEventsComponent from '../../src/components/events/events-page';
import { EventsCategories } from '../../types';
import { GetStaticProps, GetStaticPropsResult } from 'next';
import Head from 'next/head';

interface IProps {
  data: EventsCategories;
  h1text: string;
}
const EventsPage = ({ data }: IProps) => {
  return (
    <>
      <Head>
        <title>Events app | Events page</title>
        <meta
          name="description"
          content="Advertisement company with detailed information about upcoming events | Events page"
        />
      </Head>
      <AllEventsComponent data={data} />
    </>
  );
};

export default EventsPage;

export const getStaticProps: GetStaticProps<IProps> =
  async function (): Promise<GetStaticPropsResult<IProps>> {
    // @ts-expect-error @typescript-eslint/ban-ts-comment
    const { events_categories } = await import('/data/data.json');
    return {
      props: {
        data: events_categories,
        h1text: 'Find all cities with events'
      }
    };
  };
