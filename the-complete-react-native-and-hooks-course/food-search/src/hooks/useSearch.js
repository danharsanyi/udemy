import React, { useState, useEffect } from 'react';
import yelp from '../api/yelp';

export default function useSearch() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleSubmit('Pasta');
  }, []);

  async function handleSubmit(searchTerm) {
    setError(null);
    try {
      const response = await yelp.get('/businesses/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'Sydney NSW',
        }
      });
      setResults(response.data.businesses)
    } catch(err) {
      console.error(err);
      setError('An error occured. Please try again later');
    }
  }

  return {
    results,
    error,
    handleSubmit
  }
}