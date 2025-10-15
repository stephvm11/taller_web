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

app.get('/dataInfo/:param', (req, res) => {
    const {param} = req.params;
    
    // dataInfo/:idItem
    if (!isNaN(param)) {
      const id = parseInt(param, 10); 
      const book = books.find(b => b.id === id);
      const response = {
        status: true,
        item: book || 'Libro no encontrado',
        dateTime: new Date().toLocaleDateString()
      }
      return res.send(response);
    }
    
    // dataInfo/:status
    if (param === 'true' || param === 'false') {
      const status = param === 'true';
      const filteredbooks = books.filter(b => b.isActive == status);
      const response = {
        status: true,
        data: filteredbooks,
        dateTime: new Date().toLocaleDateString()
      }
      return res.send(response);
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

