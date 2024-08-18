'use client';

import React, { useEffect } from 'react'
// import { useRouter } from 'next/router'
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

const Room = () => {
    const { id } = useParams();
    const [message, setMessage] = useState<string | null>(null);
    const [url, setUrl] = useState<Location | null>(null);
    useEffect(() => {
      setUrl(window.location);
    });
    // const url = usePathname();

    const handleClick = (buttonName: string) => {
      setMessage(`${buttonName} button is clicked on room ${id}`);
    }

  return (
    <div>
      {/* <h1>Room ID: {id}</h1> */}
      <div>
        <h1>Room ID: {id}</h1>
        <h2>Room Link: {url?.href}</h2>
      </div>
      <button
      onClick={() => handleClick('Button 1')}
      className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Button 1
      </button>
      <button
      onClick={() => handleClick('Button 2')}
      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Button 2
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Room