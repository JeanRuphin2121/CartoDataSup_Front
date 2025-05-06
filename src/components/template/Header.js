import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthProvider';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/constant';

import { useNavigate } from 'react-router-dom';

function ImportData({ onCompleted, endpoint = API_BASE_URL + `import-data/`, token, setLoading }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [localLoading, setLocalLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setMessage('');
      setSuccess(false);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) {
        setMessage('📎 Veuillez sélectionner un fichier .csv');
        return;
      }
  
      const formData = new FormData();
      formData.append('csv_file', file);
  
      try {
        setLocalLoading(true);
        setLoading?.(true); // <- appel du prop global

        setMessage('⏳ Importation en cours, veuillez patienter...');
        const response = await axios.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
  
        if (response.data.message) {
          setSuccess(true);
          setMessage('✅ Importation réussie ! Cliquez sur OK pour continuer.');
        } else {
          throw new Error(response.data.error || "Erreur inconnue");
        }
      } catch (err) {
        setMessage(`❌ ${err.response?.data?.error || "Erreur lors de l'importation."}`);
      } finally {
        setLocalLoading(false);
        setLoading?.(false);
      }
    };
  
    const handleSuccessConfirm = () => {
      onCompleted?.();
      navigate('/dashboard');
    };
  
    return (
      <div>
        {localLoading && (
          <div className="alert alert-info text-center" role="alert">
            ⏳ Importation en cours... Veuillez patienter.
          </div>
        )}
  
        {!success && (
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" disabled={localLoading}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="form-control"
              disabled={localLoading}
            />
            <button type="submit" className="btn btn-primary" disabled={localLoading}>
              {localLoading ? 'Importation...' : 'Importer'}
            </button>
          </form>
        )}
  
        {message && (
          <div className={`mt-3 alert ${success ? 'alert-success' : 'alert-warning'}`} role="alert">
            {message}
            {success && (
              <div className="text-center mt-3">
                <button onClick={handleSuccessConfirm} className="btn btn-success">
                  OK
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
}


export default function Header() {
    const auth = useAuth();
    const [showImportModal, setShowImportModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 👈 suivi du loading global
  
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
              <Link to="/" className="nav-link">Actualiser</Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" className="nav-link" onClick={() => setShowImportModal(true)}>Importer</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" className="nav-link">Paramètres</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a onClick={() => auth.logOut()} href="#" className="nav-link">Déconnexion</a>
            </li>
          </ul>
  
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                <i className="fas fa-th-large"></i> &nbsp; Liste des indicateurs
              </a>
            </li>
          </ul>
        </nav>
  
        {/* Modal d'importation */}
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
                      onClick={() => !isLoading && setShowImportModal(false)} // ❌ bloc fermeture si loading
                      aria-label="Close"
                      disabled={isLoading} // désactivé si en cours
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ImportData
                      endpoint={API_BASE_URL + `import-data/`}
                      token={auth.token}
                      onCompleted={() => setShowImportModal(false)}
                      setLoading={setIsLoading} // 👈 lifting loading
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </>
        )}
      </>
    );
}
  
