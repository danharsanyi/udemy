import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';

import SearchBar from '../components/SearchBar';
import useSearch from '../hooks/useSearch';

import ResultsList from '../components/ResultsList';

export default function SearchScreen() {
  const [term, setTerm] = useState('');
  const {results, error, handleSubmit} = useSearch();

  const filterResultsbyPrice = (price) => {
    return results.filter(r => r.price === price);
  }

  function handleChange(value) {
    setTerm(value);
  }

  return (
    <>
      <SearchBar
        searchTerm={term}
        handleChange={handleChange}
        handleSubmit={() => handleSubmit(term)}
      />
      {error && <Text>{error}</Text>}
      <ScrollView>
        <ResultsList results={filterResultsbyPrice('$')} title="Cost effective" />
        <ResultsList results={filterResultsbyPrice('$$')} title="Bit pricier" />
        <ResultsList results={filterResultsbyPrice('$$$')} title="Big spender" />
      </ScrollView>
    </>
  );
}
