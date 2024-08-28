import React, { useState, useEffect } from 'react'
import { cards } from '../interfaces/cards';
import Image from 'next/image';



const Tarot_arc = () => {
    const [images, loadImages] = useState<cards>({ front: [], back: []});

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

    // console.log(images);

    return (
        <div 
        className="card-container flex flex-col w-full h-screen justify-center"
        >
            <ul 
            className="cards flex justify-center text-center w-full h-1/2"
            >
                {/* {images.front.map((img, index) => {
                    <li>

                    </li>
                })} */}
                {images.front.map((img, index) => (
                    <li key={`card-${index}`}
                    className='absolute hover:-translate-y-4'
                    >
                        <div 
                        className="card cursor-pointer flex justify-center text-center relative"
                        >
                            <div className="front">
                                <Image
                                key={index}
                                src={img}
                                alt={`image_${index}`}
                                width={120}
                                height={220}
                                />
                            </div>
                            <div className="back">
                                <Image
                                key={index}
                                src={images.back[0]}
                                alt={`image_${index}`}
                                width={120}
                                height={220}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tarot_arc