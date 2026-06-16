import React from 'react';
import Dashboard from './components/Dashboard';
import AddDocument from './components/AddDocument';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Document Tracking System</h1>
      <AddDocument />
      <hr />
      <Dashboard />
    </div>
  );
}

export default App;
