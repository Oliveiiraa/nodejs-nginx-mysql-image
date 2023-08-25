const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

app.use(express.json())

// const createTableQuery = `
//   CREATE TABLE people (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(100) NOT NULL
//   )
// `;
//
// function createTable() {
//     db.query(createTableQuery, (err, result) => {
//         if (err) {
//             console.error('Erro ao criar a tabela:', err);
//         } else {
//             console.log('Tabela criada com sucesso!');
//         }
//         db.end();
//     });
// }
//
// createTable();

app.get('/', (req, res) => {
    const name = 'Gabriel';

    db.query('INSERT INTO people (name) VALUES (?)', [name], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving data to database');
        }
    });

    db.query('SELECT * FROM people', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving data from database');
        }

        const people = results.map((row) => row.name);
        res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${people.map((person) => `<li>${person}</li>`).join('')}
      </ul>
    `);
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
