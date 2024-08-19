import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    const options = {
      method: 'GET',
      url: 'https://famous-quotes4.p.rapidapi.com/random',
      params: { category: 'all', count: '1' },
      headers: {
        'X-RapidAPI-Key': '1288770628mshd8dae950a4f994bp14d8a1jsndb2a7c78c85e', 
        'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data[0];
      setQuote(data.text);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  return (
    <div className="App">
      <h1>Random Quote Generator</h1>
      <p>{quote ? `"${quote}"` : 'Click the button to get a random quote.'}</p>
      <p>{author && `- ${author}`}</p>
      <button onClick={fetchQuote}>Get Quote</button>
    </div>
  );
}

export default App;
