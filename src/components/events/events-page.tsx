import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventsCategories } from '../../../types';

interface IProps {
  data: EventsCategories;
}
const AllEventsComponent = ({ data }: IProps) => {
  return (
    <div className="events_page">
      {data?.map(ev => (
        <Link key={ev.id} href={`/events/${ev.id}`} passHref>
          <a className="card">
            <Image src={ev.image} alt={ev.title} width={500} height={500} />{' '}
            <h2>{ev.title} </h2>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AllEventsComponent;
