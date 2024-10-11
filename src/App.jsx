import { useState } from 'react';
import Dictionary from './dictionary';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';

function App() {
  
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>Dictionary</h1>
        </header>
        <main>
          <Dictionary />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;

