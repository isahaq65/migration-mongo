require('dotenv').config();
const fs = require("fs");
const path = require("path");
const { connectToMongo } = require("./exportDatabase");
const { default: mongoose } = require("mongoose");
const targetUri = process.env.TARGET_URI

function fileList() {
    let directory = "./backup";
    let filesName = [];
    try {
        const files = fs.readdirSync(directory);

        files.forEach((file) => {
            console.log(file);
            filesName.push(file.slice(0, file.indexOf(".")));
        });
    } catch (err) {
        console.log(err);
    }
    console.log(filesName);
    return filesName;
}

async function importToNewDatabase() {

	await connectToMongo(targetUri)
	const targetDb = mongoose.connection.db;
    
	const collectionNames = fileList()
	
	collectionNames.forEach(async(name) => {
		const data = JSON.parse(fs.readFileSync(`${exportDir}/${name}.json`, "utf-8"));
		const targetCollection = targetDb.collection(name);
        await targetCollection.insertMany(data);
	})
	
	
}


module.exports={importToNewDatabase}