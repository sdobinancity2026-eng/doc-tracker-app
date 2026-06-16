import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

function Dashboard() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "documents"), (snapshot) => {
      setDocs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Function to handle the status update
  const handleUpdateStatus = async (id, newStatus) => {
    const docRef = doc(db, "documents", id);
    await updateDoc(docRef, {
      status: newStatus,
      lastUpdated: new Date().toLocaleDateString()
    });
  };

  return (
    <div>
      <h1>Document Tracking Dashboard</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.trackingNumber}</td>
              <td>{doc.status}</td>
              <td>
                <select onChange={(e) => handleUpdateStatus(doc.id, e.target.value)} defaultValue={doc.status}>
                  <option value="REC">Received (REC)</option>
                  <option value="SIG">For Signature (SIG)</option>
                  <option value="RET">For Return (RET)</option>
                  <option value="RDY">Ready for Pickup (RDY)</option>
                  <option value="DON">Done (DON)</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
