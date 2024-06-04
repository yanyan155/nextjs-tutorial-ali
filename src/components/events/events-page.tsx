import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventsCategories } from '../../../types';

interface IProps {
  data: EventsCategories;
}
const AllEventsComponent = ({ data }: IProps) => {
  return (
    <div className="flex flex-row gap-5 ">
      {data?.map(ev => (
        <Link key={ev.id} href={`/events/${ev.id}`} passHref>
          <a className="relative">
            <Image src={ev.image} alt={ev.title} width={500} height={500} />{' '}
            <h2 className="absolute w-full top-1/2 text-center text-4xl text-white uppercase drop-shadow-3xl">
              {ev.title}{' '}
            </h2>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AllEventsComponent;
