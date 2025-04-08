import { useAuth } from '../../hooks/AuthProvider';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/constant';
import { useFilters } from '../../hooks/FilterProvider';

export default function Aside() {

  const { filters, setFilters } = useFilters();
  const [data, setData] = useState([]);
  const { user, token, logOut } = useAuth();

  const [annee, setAnnee] = useState(null);
  const [academy, setAcademie] = useState(null);
  const [departement, setDepartement] = useState(null);
  const [commune, setCommune] = useState(null);
  const [region, setRegion] = useState(null);
  const [etablissement, setEtablissement] = useState(null);

  useEffect(() => {
      fetchOptions();
  },[filters.annee, filters.academy, filters.departement, commune, filters.region, filters.etablissement]);

    // Fonction pour récupérer les données statistiques et préparation pour les graphiques
  const fetchOptions = async () => {
    try {
        console.log("token", token);
        const response = await axios.get(API_BASE_URL + "filters/", 
            {
              params: filters,
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
        setData(response.data);

    } catch (error) {

      console.error("Erreur chargement données :", error);
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.code === "token_not_valid"
      ) {
        logOut();
      }
    }
  };

  const handleAnneeChange = (value) => {
    setFilters({ ...filters, annee: value });
  };

  const handleAcademyChange = (value) => {
    setFilters({ ...filters, academy: value });
  };

  const handleDepartementChange = (value) => {
    setFilters({ ...filters, departement: value });
  };
  const handleCommuneChange = (value) => {
    setFilters({ ...filters, commune: value });
  };
  const handleRegionChange = (value) => {
    setFilters({ ...filters, region: value });
  };
  const handleEtablissementChange = (value) => {
    setFilters({ ...filters, etablissement: value });
  };

  return (
    
    // <!-- Main Sidebar Container -->
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* <!-- Brand Logo --> */}
    <a href="index3.html" className="brand-link">
      <img src="template/dist/img/custom/kaleinnoLogo.webp" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}}/>
      <span className="brand-text font-weight-light">aléinno</span>
    </a>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-2 d-flex">
        <div className="image">
          <img src="template/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" className="d-block">Alexander Pierce</a>
        </div>
      </div>

      {/* <!-- SidebarSearch Form --> */}
      {/* <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div> */}

      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column aside-menu-ul" data-widget="treeview" role="menu" data-accordion="false">
          {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
          
          <li className="nav-item mb-1 active">
            <a className="nav-link">
              <i className="nav-icon fas fa-filter"></i>
              <p>
                Filtres
              </p>
            </a>
          </li>

          {/* Filtre Année */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-calendar"></i>
              <p>Session</p>
            </a>
            <select className="custom-select" onChange={(e) => handleAnneeChange(e.target.value)}>
              <option value=""> Toutes </option>
            {data.annees && data.annees.map((annee) => (
              <option key={annee} value={annee}>
                {annee}
              </option>
            ))}
            </select>
          </li>
          
          {/* Filtre Académie */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Académie</p>
            </a>
            <select className="custom-select" onChange={(e) => handleAcademyChange(e.target.value)}>
            {data.academies && data.academies.map((academie) => (
              <option key={academie} value={academie}>
                {academie}
              </option>
            ))}
            </select>
          </li>

          {/* Filtre Département */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Département</p>
            </a>
            <select className="custom-select"   onChange={(e) => handleDepartementChange(e.target.value)}>
            {data.departements && data.departements.map((departement) => (
              <option key={departement} value={departement}>
                {departement}
              </option>
            ))}
            </select>
          </li>

          {/* Filtre Commune */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Communes</p>
            </a>
            <select className="custom-select"   onChange={(e) => handleCommuneChange(e.target.value)}>
            {data.communes && data.communes.map((commune) => (
              <option key={commune} value={commune}>
                {commune}
              </option>
            ))}
            </select>
          </li>

          {/* Filtre Région */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Région</p>
            </a>
            <select className="custom-select"  onChange={(e) => handleRegionChange(e.target.value)}>
            {data.regions && data.regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
            </select>
          </li>

          {/* Filtre Type d'Établissement */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-school"></i>
              <p>Établissement</p>
            </a>
            <select className="custom-select" onChange={(e) => handleEtablissementChange(e.target.value)}>
            {data.etablissements && data.etablissements.map((etablissement) => (
              <option key={etablissement} value={etablissement}>
                {etablissement}
              </option>
            ))}
            </select>
          </li>

          {/* Filtre Type de Formation */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-graduation-cap"></i>
              <p>Formation</p>
            </a>
            <select className="custom-select">
              <option>Toutes</option>
              <option>CPGE</option>
              <option>BTS</option>
              <option>BUT</option>
              <option>Licence</option>
            </select>
          </li>

          {/* Filtre Sélectivité */}
          <li className="nav-item mb-3">
            <a className="nav-link">
              <i className="nav-icon fas fa-filter"></i>
              <p>Formation Sélective</p>
            </a>
            <select className="custom-select">
              <option>Oui</option>
              <option>Non</option>
            </select>
          </li>

          {/* Bouton Appliquer les Filtres */}
          <li className="nav-item mb-2">
            <button className="btn btn-primary btn-block">
              <i className="fas fa-filter"></i> Appliquer les filtres
            </button>
          </li>

        </ul>
      </nav>
      {/* <!-- /.sidebar-menu --> */}
    </div>
    {/* <!-- /.sidebar --> */}
  </aside>


  );
}