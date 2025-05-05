import React, { useState } from 'react';
import axios from 'axios';

const ImportData = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('csv_file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/import-data/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Données importées avec succès !');
    } catch (error) {
      setMessage('Erreur lors de l\'importation des données.');
    }
  };

  return (
    <div>
      <h2>Importer les données CSV</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".csv" />
        <button type="submit">Importer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImportData;
