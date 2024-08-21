// import { NextRequest, NextResponse } from "next/server";
import { NextRequest, NextResponse } from "next/server";
import { pin } from "@/app/interfaces/db_interfaces";
import { roomSession } from "@/app/interfaces/db_interfaces";

export async function POST(request: NextRequest){
    try{
        const pinData: pin = await request.json();
        
        // create url using request.url
        const url = new URL('/api/getMongoData', request.url).toString();

        const db_res = await fetch(url);
        if (!db_res.ok){
            throw new Error('Failed to fetch data from the database');
        }
        const db_data = await db_res.json();


        // db_data.forEach((room: roomSession) => {
        //     if (room.room_pin === pinData.roomPin){
        //         // if room pin matches, return room data
        //         return NextResponse.json({ message: "Found"}, { status: 200 });
        //     } else {
        //         return NextResponse.json({ message: "Room not found." }, {status: 404});
        //     }
        // });
        const matchingRoom = db_data.find((room: roomSession) => room.room_pin === pinData.roomPin);

        if (matchingRoom){
            return NextResponse.json({ message: "Found" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Room not found." }, { status: 404});
        }

    } catch (err){
        console.error('Error:', err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}