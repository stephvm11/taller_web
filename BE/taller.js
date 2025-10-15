const express = require('express');
const app = express();
const port = 3000;
const books = require('./books');

app.get('/allData', (req, res) => {
    const response = {
        status: true,
        data: books,
        dateTime: new Date().toLocaleDateString()
    }
  res.send(response);
});


app.get('/dataInfo/:idItem', (req, res) => {
    const {idItem} = req.params;
    const id = parseInt(idItem, 10); 
    const book = books.find(b => b.id === id);
    const response = {
        status: true,
        item: book || 'Libro no encontrado',
        dateTime: new Date().toLocaleDateString()
    }
  res.send(response);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});

