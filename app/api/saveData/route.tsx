import { MongoClient } from "mongodb";
import { setupTTLIndex } from "@/app/utils/setupTTLIndex";
import { roomSession } from "@/app/interfaces/db_interfaces";
import {NextRequest, NextResponse} from "next/server";

/**
 * Handles POST requests to insert a new room session document into the `rooms` collection
 * in the `tarot_db` MongoDB database. The document includes a TTL index setup to automatically
 * delete it after a specified period.
 * 
 * @param {NextRequest} request - The incoming POST request containing the room session data. 
 * @returns {Promise<NextResponse>} - A JSON response indicating success or failure.
 */
export async function POST(request: NextRequest){
    // Connection string for MongoDB, using environment variables for user, password, and port.
    const mongoString = `mongodb://${process.env.MONGO_USR}:${process.env.MONGO_PS}@localhost:${process.env.MONGO_PORT}/admin`;
    const client = new MongoClient(mongoString);
    
    try {
        // Attempt to connect to the MongoDB server.
        await client.connect();

        // Select the `tarot_db` database.
        const database = client.db("tarot_db");
        const roomCollection = database.collection("rooms");

        // set up the TTL index before inseting data
        await setupTTLIndex();

        // Parse the request body to retrieve the room session data. 
        const body: roomSession = await request.json();

        // insert the room session data into the `rooms` collection.
        await roomCollection.insertOne(body);
        
        // return a success response.
        return NextResponse.json({ message: "Room created successfully." });

    } catch (err) {
        // Log the error and return a failure response with a 500 status code.
        console.error("Error creating room:", err);
        return NextResponse.json({ error: "Failed to created room."}, {status: 500});

    } finally {
        // Ensure that the MongoDB client is closed, whether or not the operation succeeds.
        await client.close();
    }

}