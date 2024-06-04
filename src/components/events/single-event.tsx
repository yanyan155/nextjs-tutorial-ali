import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { OneEvent } from '../../../types';

interface IProps {
  data: OneEvent;
}

const SingleEvent = ({ data }: IProps) => {
  // https://www.totaltypescript.com/strongly-type-useref-with-elementref
  const inputEmail = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail && inputEmail.current) {
      const emailValue = inputEmail.current.value;
      const eventId = router?.query.id;

      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!emailValue.match(validRegex)) {
        setMessage('Please introduce a correct email address');
      }

      try {
        const response = await fetch('/api/email-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: emailValue, eventId })
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setMessage(data.message);
        inputEmail.current.value = '';
      } catch (e) {
        console.log('ERROR', e);
      }
    }
  };

  return (
    <div>
      <h1> {data.title} </h1>
      <Image src={data.image} width={1000} height={500} alt={data.title} />
      <p> {data.description} </p>
      <form onSubmit={onSubmit} className="mt-7">
        <label className="flex mt-7 mb-4 uppercase text-lg font-extrabold">
          Get Registered for this event!
        </label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
          className="h-10 min-w-80 rounded border-1 border-solid border-slate-200 text-base pl-1"
        />
        <button
          className="h-10 min-w-36 rounded border-1 border-solid border-emerald-700 text-lg uppercase ml-3 font-bold cursor-pointer bg-teal-200 hover:bg-teal-200 hover:text-slate-800"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SingleEvent;
