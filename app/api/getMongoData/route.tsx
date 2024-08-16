import { NextResponse } from "next/server";
import { MongoClient} from "mongodb";

export async function GET(){
    const mongoString = `mongodb://${process.env.MONGO_USR}:${process.env.MONGO_PS}@localhost:${process.env.MONGO_PORT}/admin`;
    const client = new MongoClient(mongoString);
    
    try{
        await client.connect();

        const database = client.db("tarot_db");

        const roomCollection = database.collection("rooms");
        const roomData = await roomCollection.find({}).toArray();

        return NextResponse.json(roomData);
    
    } catch (err){
        return NextResponse.json({
            message: "Database error: Failed to connect to database."
        }, { status: 500 });
    } finally {
        await client.close();
    }
}