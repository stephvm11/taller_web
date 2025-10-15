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


app.get('/dataInfo/:status', (req, res) => {
  const {status} = req.params;
  if (status == 'true' || status == 'false') {
    const filteredbooks = books.filter(b => b.isActive == status);
    const response = {
        status: true,
        data: filteredbooks || 'Parámetro no válido',
        dateTime: new Date().toLocaleDateString()
    }
    res.send(response);
  }
});

app.get('/dataInfoQuery', (req, res) => {
    const {search} = req.query;
    const filteredbooks = books.filter(b => 
      b.id == search.id ||
      b.isActive == search.isActive ||
      b.nameBook == search.nameBook ||
      b.gender == search.gender
    );
    const response = {
        status: true,
        data: filteredbooks || 'Parámetros no válidos',
        dateTime: new Date().toLocaleDateString()
    }
    res.send(response);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});

