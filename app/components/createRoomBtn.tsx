'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { generateSessionId } from '../utils/genSession'
import { generateRandomPin } from '../utils/genSession'
import { roomSession } from '../interfaces/db_interfaces'

/**
 * Button component for creating a new room session. On click, it generates
 * a random pin and session ID, saves the room session data to the database, 
 * and then redirects the user to the new room page.
 * 
 * @returns 
 */
const CreateRoomBtn = () => {
    const fetchMongoData = async () => {
        const response = await fetch("/api/getMongoData");
        const data = await response.json();
        console.log(data);
    }

    // Hook for programmatic nagivation
    const router = useRouter();

    /**
     * Generates a random pin and session ID, saves the room session data
     * to the database via an API call, and redirects the user to the new 
     * room page.
     */
    const genRoomSesSAndRedirect = async () => {
        // Generate random pin and session ID
        const pin = generateRandomPin();
        const sessionId = generateSessionId(pin);
        console.log(`Generated session ID: ${sessionId}`);

        // Create a room session object
        const roomSess : roomSession = {
            room_pin: pin,
            room_sess: sessionId,
            isHost: true,  // Assume the user is the host for now
            createdAt: new Date(),
        }

        try{
            // Save the room session data to the database
            const response = await fetch('/api/saveData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomSess),
            });

            if (response.ok){
                localStorage.setItem('sessionId', sessionId);

                // On success, redirect to the new room page
                console.log('Room created successfully.');
                router.push(`/room/${pin}`);
            } else {
                // Handle errors
                console.error('Error creating room:', await response.json());
            }
        } catch (err) {
            // Handle network or other errors
            console.error('Error saving data:', err);
        }
    }

    return (
        <div>
        <button
        onClick={genRoomSesSAndRedirect}
        type="button"
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
            Create Room
        </button>
        <button
        onClick={fetchMongoData}
        type="button"
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
        test db
        </button>
        </div>
    )
}

export default CreateRoomBtn