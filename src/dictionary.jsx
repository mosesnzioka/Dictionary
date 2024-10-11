import React, { useState, useRef } from 'react';
import { useQuery } from 'react-query';

const fetchWord = async (word) => {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if (!response.ok) {
    throw new Error('Network error.. fix it and try again');
  }
  return response.json();
};

const Dictionary = () => {
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  const { data, error, isLoading } = useQuery(['dictionary', search], () => fetchWord(search), {
    enabled: !!search,
  });

  const handleSearch = () => {
    const word = inputRef.current.value;
    setSearch(word);
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter a word"
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && data.length > 0 && (
        <div>
          {data.map((entry, index) => (
            <div key={index}>
              <h3>{entry.word}</h3>
              <p><strong>Phonetic:</strong> {entry.phonetic}</p>
              {entry.phonetics && entry.phonetics.map((phonetic, phoneticIndex) => (
                <div key={phoneticIndex}>
                  <p>{phonetic.text}</p>
                  {phonetic.audio && <audio controls src={phonetic.audio}></audio>}
                </div>
              ))}
              <p><strong>Origin:</strong> {entry.origin}</p>
              {entry.meanings && entry.meanings.map((meaning, meaningIndex) => (
                <div key={meaningIndex}>
                  <h4>{meaning.partOfSpeech}</h4>
                  {meaning.definitions.map((definition, definitionIndex) => (
                    <div key={definitionIndex}>
                      <p>{definition.definition}</p>
                      {definition.example && <p><em>Example:</em> {definition.example}</p>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dictionary;
