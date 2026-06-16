import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function AddDocument() {
  const [docName, setDocName] = useState('');
  const [origin, setOrigin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate Tracking Number: e.g., 2026-0617-REG-0001
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, ''); // Format: 20260617
    const trackingNumber = `2026-${dateStr.slice(4)}-${origin.toUpperCase()}-0001`;

    try {
      await addDoc(collection(db, "documents"), {
        trackingNumber: trackingNumber,
        documentName: docName,
        origin: origin,
        status: "REC", // Default status
        lastUpdated: new Date().toLocaleDateString()
      });
      alert("Document added with ID: " + trackingNumber);
      setDocName('');
      setOrigin('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register New Document</h3>
      <input 
        placeholder="Document Name" 
        value={docName} 
        onChange={(e) => setDocName(e.target.value)} 
        required 
      />
      <input 
        placeholder="Origin Office (e.g., REG)" 
        value={origin} 
        onChange={(e) => setOrigin(e.target.value)} 
        required 
      />
      <button type="submit">Submit Document</button>
    </form>
  );
}

export default AddDocument;
