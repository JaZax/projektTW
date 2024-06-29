import React, { useState } from 'react';

const AuthorForm = ({ onAuthorAdded }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onAuthorAdded({ name, surname });
      setName('');
      setSurname('');
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Surname:</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Author</button>
    </form>
  );
};

export default AuthorForm;
