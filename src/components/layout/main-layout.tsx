import React, { ReactNode } from 'react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

interface IProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto my-0 py-7 px-20 min-h-96">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
