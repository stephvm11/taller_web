const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const books = require('./books');

app.use(cors());

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
    const {id, status, picture, datePublish, nameBook, gender} = req.query;
    const filteredBooks = books.filter(book => {
        return (
            (!id || book.id === id) &&
            (!status || book.isActive.toString() === status) &&
            (!picture || book.picture === picture) &&
            (!datePublish || book.datePublish === datePublish) &&
            (!nameBook || book.nameBook.includes(nameBook)) &&
            (!gender || book.gender === gender)
        );
    });
    const response = {
        status: true,
        data: filteredBooks || 'Libro(s) no encontrado(s)',
        dateTime: new Date().toLocaleDateString()
    }
    res.send(response);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
