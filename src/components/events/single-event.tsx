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
    <div className="event_single_page">
      <h1> {data.title} </h1>
      <Image src={data.image} width={1000} height={500} alt={data.title} />
      <p> {data.description} </p>
      <form onSubmit={onSubmit} className="email_registration">
        <label> Get Registered for this event!</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />
        <button type="submit"> Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SingleEvent;
