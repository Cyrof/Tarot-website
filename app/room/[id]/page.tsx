'use client';

import React from 'react'
// import { useRouter } from 'next/router'
import { useParams } from 'next/navigation';

const Room = () => {
    const { id } = useParams();

  return (
    <h1>Room ID: {id}</h1>
  )
}

export default Room