'use client'
import { useState } from 'react';
import { db } from '@/lib/firebase';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const snapshot = await db.collection('items').where('fieldToSearch', '==', query).get();
      const data = snapshot.docs.map((doc) => doc.data());
      setResults(data);
      console.log(data)
    } catch (error) {
      console.error('Error searching Firestore:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.fieldToDisplay}</li>
        ))}
      </ul>
    </div>
  );
}
