import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = 3066;


app.get('/:class_name', (req, res) => {
    // Retrieve all users from the database
    const { class_name } = req.params;
    let [classFaculty, classNumber] = class_name.split('+');
    classFaculty = decodeURIComponent(classFaculty).replace(/ /g, '_').toUpperCase();
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const newClassName = classFaculty + ' ' + classNumber;
    connection.query('SELECT * FROM sqldb WHERE class_name = ?', [newClassName], (err, results) => {
        if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.json(results);
        }
    });
});


app.listen(
    PORT,
    () => console.log(`Server running on port ${PORT}`)
)

