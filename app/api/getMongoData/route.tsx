import { NextResponse } from "next/server";
import { MongoClient} from "mongodb";

/**
 * Handles GET requests to retrieve all documents from the `rooms` collection 
 * in the `tarot_db` MongoDB database. 
 * 
 * @returns {Promise<NextResponse>} - A JSON response containing an array or room documents
 *                                    if successful, or an error message with a 500 status code
 *                                    if the database connection fails. 
 */
export async function GET(){
    // Connection string for MongoDB, using environment variables for user, password, and port.
    const mongoString = `mongodb://${process.env.MONGO_USR}:${process.env.MONGO_PS}@localhost:${process.env.MONGO_PORT}/admin`;
    const client = new MongoClient(mongoString);
    
    try{
        // Attempt to connect to the MongoDB server.
        await client.connect();

        // Select the `tarot_db` database.
        const database = client.db("tarot_db");

        // Access the `rooms` collection within the `tarot_db` database.
        const roomCollection = database.collection("rooms");

        // Retrieve all documents from the `rooms` collection and convert them to an array.
        const roomData = await roomCollection.find({}).toArray();

        // Return the retrieved data as a JSON response.
        return NextResponse.json(roomData);
    
    } catch (err){
        // If an error occurs, return an error message with a 500 status code.
        return NextResponse.json({
            message: "Database error: Failed to connect to database."
        }, { status: 500 });
    } finally {
        // Ensure that the MongoDB client is closed, whether or not the operation succeeds.
        await client.close();
    }
}