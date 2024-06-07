import React from 'react';
import SingleEvent from '../../../src/components/events/single-event';
import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import { ServerData, OneEvent, ParsedPageId } from '../../../types';
import Head from 'next/head';

interface IProps {
  data: OneEvent;
  h1text: string;
}
const EventPage: NextPage<IProps> = ({ data }: IProps) => {
  return (
    <>
      <SingleEvent data={data} />
      <Head>
        <title>Events app | {data.title} page</title>
        <meta name="description" content={data.description} />
      </Head>
    </>
  );
};

export default EventPage;

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
// need to define allowed dynamic path
export async function getStaticPaths() {
  // @ts-expect-error @typescript-eslint/ban-ts-comment
  const data = await import('/data/data.json');
  const allEvents = data.allEvents as ServerData['allEvents'];

  const allPaths = allEvents.map((path: OneEvent) => {
    return {
      params: {
        cat: path.city,
        id: path.id
      }
    };
  });

  return {
    paths: allPaths,
    fallback: false
  };
}

//  https://github.com/vercel/next.js/discussions/16522
export const getStaticProps: GetStaticProps<IProps, ParsedPageId> =
  async function (context): Promise<GetStaticPropsResult<IProps>> {
    console.log('context', context);
    const id = context.params!.id;
    // @ts-expect-error @typescript-eslint/ban-ts-comment
    const { allEvents } = await import('/data/data.json');
    const eventData = allEvents.find((ev: OneEvent) => id === ev.id);

    return {
      props: {
        data: eventData,
        h1text: `Find details for "${eventData.title}" event`
      }
    };
  };
