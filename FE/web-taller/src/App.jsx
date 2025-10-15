import React, { useState, useEffect } from 'react';
import BookCard from './bookCard';
import './App.css';

const API_BASE_URL = 'http://localhost:3000';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState({
    id: '',
    nameBook: '',
    gender: '',
    isActive: ''
  });

  const fetchAllBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/allData`);
      const data = await response.json();
      if (data.status) {
        setBooks(Array.isArray(data.data) ? data.data : []);
      }
    } catch (err) {
      setError('Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookById = async (id) => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/dataInfo/${id}`);
      const data = await response.json();
      
      if (data.status) {

        const bookItem = data.item && typeof data.item === 'object' ? data.item : null;
        
        setBooks(bookItem ? [bookItem] : []); 
      } else {
        setBooks([]);
      }
    } catch (err) {
      setError('Error al buscar el libro');
    } finally {
      setLoading(false);
    }
  };

  const fetchBooksByStatus = async (status) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/dataInfo/${status}`);
      const data = await response.json();
      if (data.status) {
        setBooks(Array.isArray(data.data) ? data.data : []);
      } else {
        setBooks([]);
      }
    } catch (err) {
      setError('Error al filtrar por estado');
    } finally {
      setLoading(false);
    }
  };

const fetchBooksByQuery = async (query) => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams();
      Object.keys(query).forEach(key => {
        if (query[key]) queryParams.append(key, query[key]);
      });
      
      const response = await fetch(`${API_BASE_URL}/dataInfoQuery?${queryParams}`);
      const data = await response.json();
      if (data.status) {
        setBooks(Array.isArray(data.data) ? data.data : []);
      }
    } catch (err) {
      setError('Error en la búsqueda avanzada');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleSearchById = (e) => {
    e.preventDefault();
    if (searchId) {
      fetchBookById(searchId);
    }
  };

  const handleSearchByStatus = (status) => {
    setSearchStatus(status);
    fetchBooksByStatus(status);
  };

  const handleQuerySearch = (e) => {
    e.preventDefault();
    fetchBooksByQuery(searchQuery);
  };

  const resetSearch = () => {
    setSearchId('');
    setSearchStatus('');
    setSearchQuery({ id: '', nameBook: '', gender: '', isActive: '' });
    fetchAllBooks();
  };

  return (
    <div className="app">
      <div className="search-section">
        <div className="search-group">
          <h3>Buscar por ID</h3>
          <form onSubmit={handleSearchById} className="search-form">
            <input
              type="number"
              placeholder="ID del libro"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
        </div>

        <div className="search-group">
          <h3>Filtrar por estado</h3>
          <div className="button-group">
            <button 
              onClick={() => handleSearchByStatus('true')}
              className={searchStatus === 'true' ? 'active' : ''}
            >
              Activos
            </button>
            <button 
              onClick={() => handleSearchByStatus('false')}
              className={searchStatus === 'false' ? 'active' : ''}
            >
              Inactivos
            </button>
          </div>
        </div>

        <div className="search-group">
          <h3>Búsqueda avanzada</h3>
          <form onSubmit={handleQuerySearch} className="advanced-search">
            <input
              type="text"
              placeholder="Nombre del libro"
              value={searchQuery.nameBook}
              onChange={(e) => setSearchQuery({...searchQuery, nameBook: e.target.value})}
            />
            <input
              type="text"
              placeholder="Género"
              value={searchQuery.gender}
              onChange={(e) => setSearchQuery({...searchQuery, gender: e.target.value})}
            />
            <select
              value={searchQuery.isActive}
              onChange={(e) => setSearchQuery({...searchQuery, isActive: e.target.value})}
            >
              <option value="">Todos los estados</option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
            <button type="submit">Buscar</button>
          </form>
        </div>

        <button onClick={resetSearch} className="reset-btn">
          Mostrar Todos
        </button>
      </div>

      {loading && <div className="loading">Cargando...</div>}
      {error && <div className="error">{error}</div>}

      <div className="results-section">
        <h2>Resultados ({books.length} libros)</h2>
        <div className="books-grid">
          {books.length > 0 ? (
            books.map(book => (
              <BookCard
                key={book.id}
                id={book.id}
                nameBook={book.nameBook}
                gender={book.gender}
                isActive={book.isActive}
                datePublish={book.datePublish}
                picture={book.picture}
              />
            ))
          ) : (
            !loading && <div className="no-results">No se encontraron libros</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;