'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

function MessagePage() {
  const [selectedOption, setSelectedOption] = useState<null | any>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const options = [
    {
      id: 2,
      value: 'app issues',
      info: 'write to us about any challenge you face while using the app we will adress it soon',
    },

    {
      id: 1,
      value: 'account deletion',
      info: 'write to us abou account deletion and why you want it be deleted this process will take 7 days to complete,incase you change your mind you may request for process abotion',
    },
    {
      id: 5,
      value: 'delete abortion ',
      info: 'request to stop your account from deletion',
    },
    {
      id: 4,
      value: 'others',
      info: 'kinly explain in a brief message what you want an agent will get back to you',
    },
  ];
  const postm = {
    email,
    message,
    request: selectedOption?.value,
  };
  const postMessage = (data: any) => {
    handlePostMessage(data);
  };
  const {
    mutate: handlePostMessage,
    isError: postError,
    isPending: postProgress,
    isSuccess: postSuccess,
  } = useMutation({
    mutationFn: async (newMessage) => {
      await axios.post('/api/messages', newMessage);
    },
    onSuccess: () => {
      setMessage(''), setEmail(''), setSelectedOption(null);
    },
  });
  const disabled = !selectedOption || message == '' || email == '';
  return (
    <div className="flex flex-1 items-center justify-center h-full">
      <div className="flex  flex-col gap-2 w-1/2">
        {postProgress && (
          <progress className="progress w-56">posting mesage</progress>
        )}
        {postSuccess && (
          <div className="toast">
            <div className="alert alert-success">
              <span>message posted </span>
            </div>
          </div>
        )}
        {postError && (
          <div className="toast">
            <div className="alert alert-error">
              <span>error </span>
            </div>
          </div>
        )}
        {options.map((option) => (
          <div className="items-center flex flex-row gap-1" key={option.id}>
            {selectedOption?.id === option?.id ? (
              <button onClick={() => setSelectedOption(null)}>
                <MdRadioButtonChecked color="red" size={24} />
              </button>
            ) : (
              <button onClick={() => setSelectedOption(option)}>
                <MdRadioButtonUnchecked color="red" size={24} />
              </button>
            )}

            <label htmlFor={option.value}>{option.value}</label>
          </div>
        ))}
        <h2 className="text-green-200 font-semibold">{selectedOption?.info}</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="">email:</label>
          <input
            className="dark:bg-slate-100 dark:text-black w-full h-10"
            type="text"
            title="email"
            name="email"
            value={email}
            placeholder="enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">message:</label>
          <textarea
            className="bg-slate-100 dark:text-black w-full"
            name="message"
            placeholder="mesage"
            id=""
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button
          disabled={disabled}
          onClick={() => postMessage(postm)}
          className="bg-blue-300 w-full rounded-lg h-12"
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default MessagePage;
