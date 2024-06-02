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
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
