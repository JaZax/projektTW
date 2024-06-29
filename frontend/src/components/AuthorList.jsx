import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorList = ({ fetchAuthors, authors }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingSurname, setEditingSurname] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleEdit = (author) => {
    setEditingId(author.id);
    setEditingName(author.name);
    setEditingSurname(author.surname);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingName('');
    setEditingSurname('');
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/authors/${editingId}`, {
        name: editingName,
        surname: editingSurname
      });
      fetchAuthors();
      handleCancel(); // Reset state after saving
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  return (
    <div>
      <h2>Authors List</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {editingId === author.id ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  style={{ width: '100px' }}
                />
                <input
                  type="text"
                  value={editingSurname}
                  onChange={(e) => setEditingSurname(e.target.value)}
                  style={{ width: '100px' }}
                />
                <div className="button-container">
                  <button className="save" onClick={handleSave}>Save</button>
                  <button className="cancel" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>{author.name} {author.surname}</span>
                <div className="button-container">
                  <button className="edit" onClick={() => handleEdit(author)}>Edit</button>
                  <button className="delete" onClick={() => fetchAuthors('delete', author.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
