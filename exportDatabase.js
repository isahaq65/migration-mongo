require('dotenv').config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const sourceUri = process.env.SOURCE_URI

const exportDir =process.env.EXPORT_DIR

async function connectToMongo(uri) {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to MongoDB at ${uri}`);
}

async function exportCollections() {
	try {
		console.log("sourceUri", sourceUri)
        await connectToMongo(sourceUri);
        const sourceDb = mongoose.connection.db;

        const collections = await sourceDb.listCollections().toArray();

        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir);
        }

        for (const collectionInfo of collections) {
            const collectionName = collectionInfo.name;
            const data = await sourceDb.collection(collectionName).find().toArray();
            const filePath = path.join(exportDir, `${collectionName}.json`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        }

        console.log("All collections exported successfully");
    } catch (error) {
        console.error("exported failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB servers");
    }
}

module.exports={exportCollections, connectToMongo}