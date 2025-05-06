import React, { useState } from 'react';
import axios from 'axios';

/**
 * Formulaire d'import CSV – pensé pour être affiché dans un modal.
 *
 * Props facultatives :
 *  - `onCompleted`: callback exécuté quand l'import réussit (utile pour fermer le modal)
 *  - `endpoint`: URL de l'API d'import (par défaut « http://127.0.0.1:8000/import-data/ »)
 */
export default function ImportData({ onCompleted, endpoint = 'http://127.0.0.1:8000/import-data/' }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Sélectionnez un fichier .csv');
      return;
    }

    const formData = new FormData();
    formData.append('csv_file', file);

    try {
      setLoading(true);
      await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Données importées avec succès ✅');
      onCompleted?.();
    } catch (err) {
      setMessage("Erreur lors de l'importation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5 className="mb-3">Importer un fichier CSV</h5>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="form-control"
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Import…' : 'Importer'}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
