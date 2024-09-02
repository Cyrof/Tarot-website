import React, { useState, useEffect } from 'react'
import { cards } from '../interfaces/cards';
import Image from 'next/image';



const Tarot_arc = () => {
    const [images, loadImages] = useState<cards>({ front: [], back: []});
    // const  screenSize = useScreenSize();

    useEffect(() => {
        const fetchImages = async () => {
            try{
                const res = await fetch('/api/loadCards');
                if (!res.ok) throw new Error('Failed to fetch images');
                const data = await res.json();
                loadImages(data.img);    
            } catch (err){
                console.error('Error fetching images:', err);
            }
        }

        fetchImages();
    }, []);

    const calculateCardPosition = (index: number, totalCards: number) => {
        const maxAngle = 70; // Total spread angle for all cards
        const middleIndex =  (totalCards -1 ) / 2; // find the center card index

        var angle = (index / (totalCards - 1)) * maxAngle - maxAngle / 2; // angle for rotation
        // var angle = ((index - middleIndex) / middleIndex) * (maxAngle / 2);
        const radius = 600; // radius of the arc
        const xOffset = radius * Math.sin((angle * Math.PI) / 100); // calculate x position using sine
        const yOffset = radius * (1 - Math.cos((angle * Math.PI) / 100)); // calculate y position using cosine

        // angle = angle < 0 ? angle - 2 : angle + 2;

        return { angle, xOffset, yOffset };
    }

    return (
        <div className="card-container flex flex-col w-full h-screen justify-center items-center">
            <ul className="cards relative w-full h-1/2 flex justify-center items-center -translate-y-3/4">
                {images.front.map((img, index) => {
                    const { angle, xOffset, yOffset } = calculateCardPosition(index, images.front.length);
                    return (
                        <li
                        key={`cards-${index}`}
                        className='absolute'
                        style={{
                            transform: `translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`,
                            transformOrigin: 'bottom center',
                            transition: 'transform 0,3s',
                        }}
                        >
                            <div className="card cursor-pointer flex justify-center text-center relative transition-transform duration-100 ease-in-out hover:-translate-y-5">
                                <div className="front h-full w-full flex justify-center text-center font-bold">
                                    <Image
                                    src={img}
                                    alt={`image_${index}`}
                                    width={120}
                                    height={220}
                                    className='w-auto h-auto'
                                    />
                                </div>
                                <div className="back absolute">
                                    <Image
                                    src={images.back[0]}
                                    alt={`image_back_${index}`}
                                    width={120}
                                    height={220}
                                    className='w-auto h-auto'
                                    />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
        // <div 
        // className="card-container flex flex-col w-full h-screen justify-center"
        // >
        //     <ul 
        //     className="cards flex justify-center text-center w-full h-1/2"
        //     >
        //         {/* {images.front.map((img, index) => {
        //             <li>

        //             </li>
        //         })} */}
        //         {images.front.map((img, index) => (
        //             <li key={`card-${index}`}
        //             className='absolute hover:-translate-y-4'
        //             >
        //                 <div 
        //                 className="card cursor-pointer flex justify-center text-center relative transition-transform duration-100 ease-in-out backface-hidden"
        //                 >
        //                     <div className="front backface-hidden h-full w-full flex justify-center text-center font-bold rotate-180 inset-0 z-20">
        //                         <Image
        //                         key={index}
        //                         src={img}
        //                         alt={`image_${index}`}
        //                         width={120}
        //                         height={220}
        //                         />
        //                     </div>
        //                     <div className="back absolute">
        //                         <Image
        //                         key={index}
        //                         src={images.back[0]}
        //                         alt={`image_${index}`}
        //                         width={120}
        //                         height={220}
        //                         />
        //                     </div>
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    )
}

export default Tarot_arc