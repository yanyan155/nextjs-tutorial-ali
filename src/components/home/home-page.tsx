import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RandomPicture from '../randomPicture/random-picture';
import { EventsCategories } from '../../../types';

interface IProps {
  data: EventsCategories;
}

export const HomePage = ({ data }: IProps) => (
  <div className="home_body">
    <RandomPicture></RandomPicture>
    {data?.map(ev => (
      <Link key={ev.id} href={`/events/${ev.id}`} passHref>
        <a className="card" href={`/events/${ev.id}`}>
          <div className="image">
            <Image width={600} height={400} alt={ev.title} src={ev.image} />
          </div>
          <div className="content">
            <h2> {ev.title} </h2>
            <p> {ev.description} </p>
          </div>
        </a>
      </Link>
    ))}
  </div>
);
// how to work with sessions
// TODO: https://clerk.com/blog/complete-guide-session-management-nextjs
