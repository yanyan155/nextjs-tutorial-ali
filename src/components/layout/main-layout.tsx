import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

interface IProps {
  children: ReactNode;
  h1text: string;
}

const MainLayout = ({ children, h1text }: IProps) => {
  console.log(h1text);
  return (
    <>
      <Head>
        <title>Events app | Home Page</title>
        <meta
          name="description"
          content="Advertisement company with detailed information about upcoming events"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header h1text={h1text} />
      <main className="w-full max-w-7xl mx-auto my-0 py-7 px-20 min-h-96">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
