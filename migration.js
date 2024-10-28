require('dotenv').config();
const fs = require("fs");
const path = require("path");
const exportDir = process.env.EXPORT_DIR
function fileList() {
    let directory = "./operationScript";
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



async function migrate() {
	console.log(exportDir)
    const files = fileList();

    for (let file of files) {
        try {
            const scriptObject = JSON.parse(fs.readFileSync(`./operationScript/${file}.json`, "utf-8"));
            const prevObject = JSON.parse(fs.readFileSync(`${exportDir}/${file}.json`, "utf-8"));
           // console.log(scriptObject, prevObject);

            const newObject = dataOperation(scriptObject, prevObject);
            //console.log("newObject", newObject);
            const jsonString = JSON.stringify(newObject, null, 2);
            //console.log(jsonString);
            fs.writeFileSync(`${exportDir}/${file}.json`, jsonString, "utf-8");
            console.log("JSON successfully.");
        } catch (err) {
            console.error("Error writing JSON to file:", err);
        }
    }
}

function dataOperation(scriptObject, prevObject) {
    let newObject = prevObject.map((one) => {
        if (scriptObject.delete) {
            scriptObject.delete.forEach((field) => {
                delete one[field];
            });
        }
        return one;
    });

    return newObject;
}

module.exports={migrate, fileList}
