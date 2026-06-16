import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your firebase instance
import { collection, onSnapshot } from 'firebase/firestore';

function Dashboard() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // Connect to the 'documents' collection in Firestore
    const unsubscribe = onSnapshot(collection(db, "documents"), (snapshot) => {
      setDocs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <div>
      <h1>Document Tracking Dashboard</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Document Name</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.trackingNumber}</td>
              <td>{doc.documentName}</td>
              <td>{doc.status}</td>
              <td>{doc.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
