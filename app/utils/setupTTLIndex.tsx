import { MongoClient } from "mongodb";

// MongoDB connection string using environment variables for user, password, and port
const mongoString = `mongodb://${process.env.MONGO_USR}:${process.env.MONGO_PS}@localhost:${process.env.MONGO_PORT}/admin`;

/**
 * Sets up a Time-To-Live (TTL) index on the `createAt` field in the `rooms` collection
 * of the `tarot_db` database. The TTL index automatically deletes documents after 8 hours
 * (28,800 seconds) from their creation time.
 * 
 * This function connects to the MongoDB instance, checks if the TTL index already exists,
 * and creates it if it does not. It logs the status of the index creation process. 
 * 
 * @returns {Promise<void>} - A promise that resolves when the TTL index setup is complete.
 * 
 * @throws {Error} Throws an error if there is an issue connecting to MongoDB or creating the index.
 */
export async function setupTTLIndex() {
    const client = new MongoClient(mongoString);

    try {
        // Connect to the MongoDB instance 
        await client.connect();

        // Select the database and collection 
        const database = client.db("tarot_db");
        const roomCollection = database.collection("rooms");

        // Retrieve existing indexes from the collection
        const indexes = await roomCollection.indexes();

        // Check if the TTL index on `createdAt` field already exists
        const ttlIndexExists = indexes.some(index => index.name === 'createdAt_1');

        if (!ttlIndexExists) {
            // Create TTL index on 'createdAt' field that expires after 8 hours (28800 seconds)
            await roomCollection.createIndex({ 'createdAt': 1 }, { expireAfterSeconds: 28800});
            console.log("TTL index created successfully.");
        } else {
            console.log("TTL index already exists.");
        }
    } catch (err) {
        // Log any errors encountered during the process
        console.error("Error creating TTL index:", err);
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}