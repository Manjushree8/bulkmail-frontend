import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [records, setRecords] = useState([]);

  const BASE_URL = 'https://bulkmail-backend-pq5l.onrender.com';

  // Fetch history
  const fetchHistory = () => {
    axios.get(`${BASE_URL}/emailhistory`)
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
      });
  };

  // Delete a record
  const deleteRecord = (id) => {
    if (window.confirm("Are you sure you want to delete this email record?")) {
      axios.delete(`${BASE_URL}/emailhistory/${id}`)
        .then(response => {
          if (response.data.success) {
            alert("Record deleted successfully!");
            fetchHistory(); // Refresh list
          } else {
            alert("Failed to delete record.");
          }
        })
        .catch(err => {
          alert("Error occurred while deleting.");
          console.error(err);
        });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sent Email History</h1>

      {records.length === 0 ? (
        <p className="text-center text-gray-500">No email records found.</p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record._id} className="bg-white p-4 rounded-md shadow-md border border-pink-200">
              <p><strong>Subject:</strong> {record.subject}</p>
              <p><strong>Message:</strong> {record.body}</p>
              <p><strong>Recipients:</strong> {record.recipients.join(', ')}</p>
              <p><strong>Status:</strong> {record.status}</p>
              <p><strong>Time:</strong> {new Date(record.createdAt).toLocaleString()}</p>

              <button
                onClick={() => deleteRecord(record._id)}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
