import React, { useCallback } from 'react';

const getImage = (): Promise<void | Blob | undefined> => {
  const data1 = Date.now();
  return fetch(
    'https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    {
      cache: 'force-cache',
      // @ts-expect-error @typescript-eslint/ban-ts-comment
      next: { revalidate: 180 }
    }
  )
    .then(
      res => {
        if (res.status === 200) {
          return res.blob();
        }
      },
      () => {
        console.log('fetch error!');
      }
    )
    .then(data => {
      // should cancel request ig another begins
      // see useRequest from react-redux masters
      const data2 = Date.now();
      console.log('fetch RandomPicture', data2 - data1);
      return data;
    });
};

const RandomPicture = () => {
  const useFn = useCallback(() => getImage(), []);
  return <>{useFn().toString()}</>;
};

export default RandomPicture;

// docs regarding this code
// https://github.com/reduxjs/redux-toolkit/issues/2666
// https://nextjs.org/docs/app/building-your-application/rendering/client-components
// // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
// https://nextjs.org/docs/app/building-your-application/caching#request-memoization
// https://learn.javascript.ru/fetch
