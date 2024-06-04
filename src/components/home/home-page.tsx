import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RandomPicture from '../randomPicture/random-picture';
import { EventsCategories } from '../../../types';

interface IProps {
  data: EventsCategories;
}

export const HomePage = ({ data }: IProps) => (
  <div className="flex flex-col gap-12">
    <RandomPicture></RandomPicture>
    {data?.map(ev => (
      <Link key={ev.id} href={`/events/${ev.id}`} passHref>
        <a
          className="flex flex-row gap-8 justify-center content-center items-center even:flex-row-reverse"
          href={`/events/${ev.id}`}
        >
          <div className="w-2/5">
            <Image width={600} height={400} alt={ev.title} src={ev.image} />
          </div>
          <div className="w-1/2">
            <h2> {ev.title} </h2>
            <p> {ev.description} </p>
          </div>
        </a>
      </Link>
    ))}
  </div>
);
