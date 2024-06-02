import React from 'react';
import AllEventsComponent from '../../src/components/events/events-page';
import { EventsCategories } from '../../types';
import { GetStaticProps, GetStaticPropsResult } from 'next';

interface IProps {
  data: EventsCategories;
}
const EventsPage = ({ data }: IProps) => {
  return <AllEventsComponent data={data} />;
};

export default EventsPage;

export const getStaticProps: GetStaticProps<IProps> =
  async function (): Promise<GetStaticPropsResult<IProps>> {
    // @ts-expect-error @typescript-eslint/ban-ts-comment
    const { events_categories } = await import('/data/data.json');
    return {
      props: {
        data: events_categories
      }
    };
  };
