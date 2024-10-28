const { exportCollections } = require("./exportDatabase");
const { importToNewDatabase } = require("./importToNewDatabase");
const { migrate } = require("./migration");
require('dotenv').config();

async function start() {
	try {
		console.log(process.env.EXPORT_DIR)
		await exportCollections()
	
	    await migrate()
		
		await importToNewDatabase()
	   
   } catch (err) {
	   console.error(err)
   }
}

start()
