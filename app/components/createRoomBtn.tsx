'use client'
import React from 'react'

const CreateRoomBtn = () => {
    const fetchMongoData = async () => {
        const response = await fetch("/api/getMongoData");
        const data = await response.json();
        console.log(data);
    }

    return (
        <button 
        onClick={fetchMongoData} 
        type="button" 
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        Create Room
        </button>       
    )
}

export default CreateRoomBtn