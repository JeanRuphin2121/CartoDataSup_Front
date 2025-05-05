import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthProvider';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/constant';

/**
 * Composant réutilisable pour l'import CSV.
 * Placé dans le même fichier pour simplifier, mais vous pouvez le déplacer
 * dans un fichier séparé (ex. components/ImportData.jsx) puis l'importer.
 */
function ImportData({ onCompleted, endpoint = `http://127.0.0.1:8000/import-data/`, token }) {
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
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
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

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="form-control"
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Import…' : 'Importer'}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default function Header() {
  const auth = useAuth();
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Actualiser
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            {/* Remplace "Profil" */}
            <a href="#" className="nav-link" onClick={() => setShowImportModal(true)}>
              Importer
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Paramètres
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a onClick={() => auth.logOut()} href="#" className="nav-link">
              Déconnexion
            </a>
          </li>
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button"
            >
              <i className="fas fa-th-large"></i> &nbsp; Liste des indicateurs
            </a>
          </li>
        </ul>
      </nav>

      {/* Import CSV Modal */}
      {showImportModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Importer un fichier CSV</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowImportModal(false)}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ImportData
                    endpoint={`http://127.0.0.1:8000/import-data/`}
                    token={auth.token}
                    onCompleted={() => setShowImportModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Modal backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}
