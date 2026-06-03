import React, { useState } from 'react';
import '../styles/ReadingList.css';

function ReadingList() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState('');
  const [titles, setTitles] = useState('');

  const addBooks = () => {
    if (titles === '' || authors === '') return;
    const newBooks = { titles, authors, read: false };
    setBooks([...books, newBooks]);
    setTitles('');
    setAuthors('');
  };

  const deleteBooks = (indexToDelete) => {
    setBooks(books.filter((book, index) => index !== indexToDelete));
  };

  const toggleRead = (indexToToggle) => {
    setBooks(
      books.map((book, index) =>
        index === indexToToggle ? { ...book, read: !book.read } : book
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addBooks();
    }
  };

  return (
    <div className="reading-list-container">
      <h1>📚 Reading List</h1>

      <div className="input-section">
        <input
          type="text"
          value={titles}
          onChange={(e) => setTitles(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter book title"
          className="input-field"
        />
        <input
          type="text"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter author name"
          className="input-field"
        />
        <button onClick={addBooks} className="btn btn-add">
          Add Book
        </button>
      </div>

      <div className="info-section">
        <p className="total-books">Total Books: {books.length}</p>
      </div>

      {books.length === 0 ? (
        <p className="empty-message">Your reading list is empty. Start adding books!</p>
      ) : (
        <div className="books-list">
          {books.map((book, index) => (
            <div key={index} className={`book-item ${book.read ? 'read' : ''}`}>
              <div className="book-info">
                <p className="book-title">
                  <strong>{book.titles}</strong>
                  {book.read && <span className="read-badge">✅ Read</span>}
                </p>
                <p className="book-author">by {book.authors}</p>
              </div>
              <div className="book-actions">
                <button
                  onClick={() => toggleRead(index)}
                  className={`btn btn-toggle ${book.read ? 'unread' : 'read'}`}
                >
                  {book.read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => deleteBooks(index)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadingList;
