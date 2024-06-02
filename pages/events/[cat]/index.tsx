import React from 'react';
import CatEvent from '../../../src/components/events/catEvent';
import type {
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage
} from 'next';

import {
  AllEvents,
  OneEvent,
  EventsCategory,
  ParsedPageCat
} from '../../../types';

interface IProps {
  data: AllEvents;
  pageName: string;
}

const EventsCatPage: NextPage<IProps> = ({ data, pageName }: IProps) => {
  return <CatEvent data={data} pageName={pageName} />;
};

export default EventsCatPage;
// https:nextjs.org/docs/pages/building-your-application/data-fetching
// https://nextjs.org/docs/app/building-your-application/caching
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // @ts-expect-error @typescript-eslint/ban-ts-comment
  const { events_categories } = await import('/data/data.json');
  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const allPaths = events_categories.map((ev: EventsCategory) => {
    return {
      params: {
        cat: ev.id.toString()
      }
    };
  });
  console.log('allPaths', allPaths);
  return {
    paths: allPaths,
    // { fallback: false } means other routes should 404
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<IProps, ParsedPageCat> =
  async function (context): Promise<GetStaticPropsResult<IProps>> {
    console.log('getStaticProps /exent ontext', context);
    const id = context?.params!.cat;
    // @ts-expect-error @typescript-eslint/ban-ts-comment
    const { allEvents } = await import('/data/data.json');

    const data = allEvents.filter((ev: OneEvent) => ev.city === id);
    // https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
    // revalidate: Incremental Static Regeneration
    return { props: { data, pageName: id }, revalidate: 30 };
  };

// HOW TO DEBUG
// https://nextjs.org/docs/pages/building-your-application/configuring/debugging
// https://nodejs.org/en/learn/getting-started/debugging
// chrome://inspect
// export const getServerSideProps = async context => {
//   context.res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=3600, stale-while-revalidate=7200'
//   );
//   console.log('getServerSideProps /event');
//   const id = context?.params.cat;
//   const { allEvents } = await import('/data/data.json');

//   const data = allEvents.filter(ev => ev.city === id);
//   return { props: { data, pageName: id } };
// };

// getInitialProps
// uses to load toggles, check eligibility to access the page

// typeof window !== 'undefined';
// fix to determine if we on SSR or CSR,
// uses to work with cookies and sessions (probably do not returns cookies on SSR)

// The purpose of this function is to prevent of caching the pages
// that fetch a/b toggles because caching leads to issues described
// export const preventPageCache = (ctx: NextPageContext) => {
//   ctx.res?.setHeader(
//       CACHE_CONTROL_HEADER_NAME,
//       NO_STORE_CACHE_CONTROL_HEADER_VALUE
//   );
// };

//res.set({
//           'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
//           Pragma: 'no-cache',
//           Expires: 'Fri, 01 Jan 1990 00:00:00 GMT',
//         });

// export const APOLLO_PERSISTED_QUERY_DISABLED = 'APQ_DISABLED';
//
// export const CACHE_CONTROL_HEADER_NAME = 'Cache-Control';
// export const STORE_CACHE_CONTROL_HEADER_VALUE =
//     'public, must-revalidate, max-age=0, s-maxage=600';
// export const NO_STORE_CACHE_CONTROL_HEADER_VALUE = 'no-store, max-age=0';
