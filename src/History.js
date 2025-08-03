import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/emailhistory')
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center"> Sent Email History</h1>

      <div className="space-y-4">
        {records.map((record, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <p><strong>Subject:</strong> {record.subject}</p>
            <p><strong>Message:</strong> {record.body}</p>
            <p><strong>Recipients:</strong> {record.recipients.join(', ')}</p>
            <p><strong>Status:</strong> {record.status}</p>
            <p><strong>Time:</strong> {new Date(record.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
