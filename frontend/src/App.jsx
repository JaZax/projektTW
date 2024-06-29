import React, { useState, useCallback, useEffect } from 'react';
import AuthorForm from './components/AuthorForm';
import AuthorList from './components/AuthorList';
import axios from 'axios';
import './App.css';

const App = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = useCallback(async (action = 'fetch', authorId = null, authorData = null) => {
    try {
      if (action === 'fetch') {
        const response = await axios.get('http://127.0.0.1:8000/authors/');
        setAuthors(response.data);
      } else if (action === 'delete' && authorId) {
        await axios.delete(`http://127.0.0.1:8000/authors/${authorId}`);
        const response = await axios.get('http://127.0.0.1:8000/authors/');
        setAuthors(response.data);
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleAuthorAdded = async (newAuthor) => {
    try {
      await axios.post('http://127.0.0.1:8000/authors/', newAuthor);
      fetchAuthors();
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  return (
    <div>
      <h1>Authors database</h1>
      <AuthorForm onAuthorAdded={handleAuthorAdded} />
      <AuthorList fetchAuthors={fetchAuthors} authors={authors} />
    </div>
  );
};

export default App;
