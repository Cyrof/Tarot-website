'use client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface ImageData {
  img: string;
  css: {
    left: string;
  };
}

const Room = () => {
  const { id } = useParams();
  const [message, setMessage] = useState<string | null>(null);
  const [url, setUrl] = useState<string>('');
  const [images, loadImages] = useState<ImageData[]>([]);

  useEffect(() => {
    setUrl(window.location.href);

    const fetchImages = async () => {
      try{
        const res = await fetch('/api/loadCards');
        if (!res.ok) throw new Error('Failed to fetch images');
        const data = await res.json();
        loadImages(data.images);
      } catch (err) {
        console.error('Error fetchying images:', err);
      }
    };

    fetchImages()
  }, []);

  const handleClick = (buttonName: string) => {
    setMessage(`${buttonName} button is clicked on room ${id}`);
  }

  // const getRotationStyle = (index: number, total: number) => {
  //   const maxAngle = 90; // max angle for the fanned effect
  //   const angle = maxAngle * (index / (total - 1)) - maxAngle / 2;

  //   const cardWidth = 160; // width of the cards (in pixels)
  //   const spacing = cardWidth / 2; // spacing between cards
  //   const totalWidth = spacing * (total - 1); // calculate total width of the fanned cards
  //   const xOffset = index * (window.innerWidth / total);
  //   // const xOffset = (index * spacing) - (totalWidth / 2);
  //   // const xOffset = (index - (total -1) / 2) * (cardWidth / 2); // center each card
  //   console.log(`xOffset: ${xOffset}`);

  //   // arc calculation 
  //   const radius = 400;
  //   const yOffset = Math.pow((index - (total - 1) / 2) / ((total - 1) / 2), 2) * radius;
  //   console.log(`yOffset: ${yOffset}`);

  //   return {
  //     transform: `rotate(${angle}deg) translate(-50%, -50%)`, // rotate the center around around midpoint
  //     // left: `calc(50% + ${xOffset}px)`, // center based on xOffset
  //     // top: `calc(50% + ${yOffset})px`, // center based on yOffset
  //     // left: `${50 + xOffset}px`,
  //     // transform: `rotate(${angle}deg)`,
  //     left: `${xOffset}px`,
  //     top: `${yOffset}px`,
  //   }
  // };


  return (
    <div className='m-0 h-screen w-screen'>
      <div>
        <h1>Room ID: {id}</h1>
        <h2>Room Link: {url}</h2>
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
      <div
      className='relative h-3/4 w-4/5 bg-blue-300 m-auto flex items-center'
      >
        {images?.map((img, index) => (
          <Image
          key={index}
          src={img.img}
          alt={`image_${index}`}
          width={120}
          height={220}
          style={img.css}
          className='object-cover absolute'
          />
        ))}
      </div>
    </div>
  )
}

export default Room