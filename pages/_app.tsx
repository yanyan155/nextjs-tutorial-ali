import React from 'react';
import MainLayout from '../src/components/layout/main-layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

type Iprops = {
  pageProps: {
    h1text: string;
  };
};

function MyApp({ Component, pageProps }: AppProps & Iprops) {
  return (
    <>
      <MainLayout h1text={pageProps.h1text}>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

export default MyApp;
