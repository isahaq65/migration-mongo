# MongoDB Export and Migration Script

This project provides a Node.js and Mongoose-based solution for **exporting, migrating, and managing MongoDB data**. It is designed for projects requiring efficient backup, migration, and multiple-collection handling, making it ideal for complex applications and flexible data management tasks.

## Project Overview

The script allows seamless export of MongoDB data from one server and import to another. By leveraging Mongoose, it provides programmatic control over MongoDB data operations, enabling automation for database management or custom backup solutions.

### Key Features

- **Backup and Data Migration**: Export MongoDB data from one environment (e.g., production) and import it to another (e.g., development or staging). This supports quick setup of development environments or data transfer between servers.
- **Multiple Collections Handling**: Automatically export and migrate all collections within a MongoDB database, making it suitable for complex applications.
- **Automated Data Transformation**: Exported data is saved in JSON format, allowing for easy modification before importing into a new environment. This is especially useful for data cleaning or restructuring.
- **Environment-Based Configuration**: Sensitive data such as database URIs are managed through environment variables, providing enhanced security and flexibility across different deployment environments.

## Use Cases

1. **Development and Testing**: Set up a local copy of a production database quickly, supporting test and debugging activities.
2. **Data Backup and Restoration**: Regularly back up MongoDB data, ensuring data safety and easy restoration.
3. **Data Migration**: Transfer data across environments, such as from staging to production or while changing database hosts.

## Benefits

- **Efficient Data Management**: Automates repetitive backup and migration tasks, saving time and effort.
- **Scalability**: Supports quick replication of complex databases with multiple collections.
- **Customizable**: Allows exporting of specific collections and mid-migration data transformations as needed.

## Installation and Usage

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
2. **Install Dependencies**:
   - Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
   - Install the required project dependencies by running the following command in your project directory:

     ```bash
     npm install
     ```
   - This will install packages specified in `package.json`, including **Mongoose** for database operations, **dotenv** for environment variable management, and **fs** for file handling.

3. **Environment Configuration**:
   - Create a `.env` file in the root directory and specify the MongoDB URIs, export path, and any other necessary settings:

     ```plaintext
     SOURCE_DB_URI=mongodb://localhost:27017/source-database
     TARGET_DB_URI=mongodb://localhost:27017/target-database
     EXPORT_PATH=./backup
     
4. **Write Migration Script**:
   - Write Migration in **operationSrcipt** folder
   - Create json file naming same as collection name which to be migrated(eg- banks.json)
   - keyword **insert, update, delete**


5. **Run the Project**:
   - Run 
      ```bash
     node index.js
     ```
   - export the data and save it to the specified `EXPORT_PATH` in JSON format as collection name
   - migrate data as per migration sript written in JSON format
   - read the JSON file from the `EXPORT_PATH` and insert the data into the specified `TARGET_DB_URI`.

6. **Verify Data Migration**:
   - After running the migration, you can verify the data transfer by connecting to the target database with `mongosh`:

     ```bash
     mongosh --host localhost --port 27017
     use target-database
     db.collectionName.find().pretty()
     ```

7. **Automate with Scheduled Backups (Optional)**:
   - To automate regular backups, you can set up a cron job or a task scheduler to run the `export.js` script periodically.

     **Example (Cron Job)**:
     ```bash
     # Backup data daily at midnight
     0 0 * * * /usr/bin/node /path/to/export.js
     ```

### File Explaination

Here are example scripts for the `export.js` and `migrate.js` files:

- **exportDatabase.js**: Exports all collections from the source database to local in JSON format.
- **migrate.js**: migrate database locally as per migration srcipt in operationScript folder.
- **importToNewDatabase.js**:Imports JSON data into the target database.

Make sure these scripts are properly configured to handle error cases and log output for troubleshooting.

### Customization

- **Select Specific Collections**: You can modify the scripts to export or import only specific collections based on your needs.
- **Transform Data**: Add custom transformation logic in `migrate.js` to modify the data before inserting it into the target database.

By following these steps, you can effectively manage and migrate MongoDB data across different environments with ease.
