import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Iprops {
  h1text: string;
}

export const Header = ({ h1text }: Iprops) => {
  return (
    <header className="h-72 px-8 py-4 bg-gradient-to-r from-cyan-50 to-cyan-200">
      <div className="h-full max-w-7xl mx-auto my-0 flex flex-col justify-around">
        <div className="topNav flex justify-between">
          <Image
            alt="logo"
            src={'/images/logo_black.png'}
            width={50}
            height={50}
          />
          <nav>
            <ul className="flex gap-4 font-semibold text-base">
              <li>
                <Link href="/" passHref>
                  <a> Home</a>
                </Link>
              </li>
              <li>
                <Link href="/events" passHref>
                  <a> Events</a>
                </Link>
              </li>
              <li>
                <Link href="/about-us" passHref>
                  <a> About us</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="uppercase text-4xl">{h1text}</p>
      </div>
    </header>
  );
};
