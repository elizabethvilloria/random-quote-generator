import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchQuote = async () => {
    setLoading(true); // Start loading
    try {
      const options = {
        method: 'GET',
        url: 'https://famous-quotes4.p.rapidapi.com/random',
        params: { category: 'all', count: '1' },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      const data = response.data[0];
      setQuote(data.text);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
    setLoading(false); // End loading
  };

  return (
    <div className="App">
      <h1>Random Quote Generator</h1>
      {loading ? <p>Loading...</p> : <p>{quote ? `"${quote}"` : 'Click the button to get a random quote.'}</p>}
      <p>{author && `- ${author}`}</p>
      <button onClick={fetchQuote} disabled={loading}>Get Quote</button>
    </div>
  );
}

export default App;
