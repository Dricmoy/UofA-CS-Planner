const fs = require('fs')
const { parse } = require('csv-parse')
require('dotenv').config()
const mysql = require('mysql2')
// Load environment variables


// Execute the query using the pool

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

// Path to your CSV file
const csvFilePath = './data.csv';


// Create a reusable parser
const parser = parse({
  columns: true,
  on_record: function (row) {

    // Insert each row into the database
    values = [row.class_name, row.class_desc, row.prereq, row.coreq].map(values => values === '' ? null : values);


    connection.query('INSERT INTO sqldb (class_name, class_desc, prereq, coreq) VALUES (?, ?, ?, ?)', values, function (err, results) {
      if (err) {
        console.error('Error inserting row:', err.message, row);
      } else {
        console.log('Row inserted successfully:', results);
      }
    });
  }
});

// Read and parse the CSV file
fs.createReadStream(csvFilePath).pipe(parser);

// Listen for 'end' event to close the pool of connections
parser.on('end', function () {
  // Close the connection pool
  connection.end();
  console.log('CSV file successfully processed.');
});
  
