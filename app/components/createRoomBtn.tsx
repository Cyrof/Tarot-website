'use client'
import React from 'react'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { generateSessionId } from '../utils/genSession'
import { generateRandomPin } from '../utils/genSession'

const CreateRoomBtn = () => {
    const fetchMongoData = async () => {
        const response = await fetch("/api/getMongoData");
        const data = await response.json();
        console.log(data);
    }
    
    const router = useRouter();

    const genRoomSesSAndRedirect = () => {
        const pin = generateRandomPin();
        const sessionId = generateSessionId(pin);
        console.log(`Generated session ID: ${sessionId}`);

        // redirect to the new room with the generated pin 
        router.push(`./room?id=${pin}`);
    }

    return (
        <button
        onClick={genRoomSesSAndRedirect}
        type="button"
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
            Create Room
        </button>
        // <>
        //     {pin ? (
        //         <Link href={{
        //             pathname: "./room",
        //             query: { id: pin},
        //         }}>
        //             <button
        //             type="button"
        //             className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        //             >
        //                 Create Room
        //             </button>
        //         </Link>
        //     ) : (
        //         <button
        //         onClick={genRoomSess}
        //         type="button"
        //         className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        //         >
        //             Create Room
        //         </button>
        //     )}
        // </>
    )
}

export default CreateRoomBtn