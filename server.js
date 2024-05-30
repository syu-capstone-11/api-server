const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const postRoutes = require('./routes/posts');
const { MOCKED_ITEM_LISTS } = require('./mocks/list.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(bodyParser.json());
app.use('/posts', postRoutes);

app.get('/api/data', (req, res) => {
    res.json({ message: 'data on' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = 'C:/nodejs/express_practice/Sqlite.js';
const db = new sqlite3.Database('./amatdadb.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Datebase connected.');
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

let items = []; 

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', express.json(), (req, res) => {
    items.push(req.body);
    res.status(201).send('Item added');
});

app.put('/items/:id', express.json(), (req, res) => {
    const index = items.findIndex(item => item.id == req.params.id);
    if (index >= 0) {
        items[index] = req.body;
        res.send('Item updated');
    } else {
        res.status(404).send('Item not found');
    }
});

app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(item => item.id == req.params.id);
    if (index >= 0) {
        items.splice(index, 1);
        res.send('Item deleted');
    } else {
        res.status(404).send('Item not found');
    }
});
