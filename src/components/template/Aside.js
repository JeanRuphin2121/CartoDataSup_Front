import { useAuth } from '../../hooks/AuthProvider';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/constant';
import { useFilters } from '../../hooks/FilterProvider';

export default function Aside() {

  const { filters, setFilters } = useFilters();
  const [data, setData] = useState([]);
  const { user, token, logOut } = useAuth();

  const [input, setInput] = useState({
    search_formation_name : "",
  });

  useEffect(() => {
      fetchOptions();
  },[filters.annee, filters.academy, filters.departement, filters.commune, filters.region, filters.status_institution, filters.etablissement,  filters.formation_selectivity, filters.formation]);

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
    setFilters({ ...filters, 
      annee: value === "" ? null : value,});
    };
    
  const handleRegionChange = (value) => {
    setFilters({ ...filters, region: value === "" ? null : value, });
  };
  const handleAcademyChange = (value) => {
    setFilters({ ...filters, academy: value === "" ? null : value, });
  };

  const handleDepartementChange = (value) => {
    setFilters({ ...filters, departement: value === "" ? null : value, });
  };
  const handleCommuneChange = (value) => {
    setFilters({ ...filters, commune: value === "" ? null : value, });
  };
  const handleStatusInstititutionChange = (value) => {
    setFilters({ ...filters, status_institution: value === "" ? null : value, });
  };
  const handleEtablissementChange = (value) => {
    setFilters({ ...filters, etablissement: value === "" ? null : value, });
  };
  const handleFormationSelectivityChange = (value) => {
    setFilters({ ...filters, formation_selectivity: value === "" ? null : value,});
  };
  const handleFormationChange = (value) => {
    setFilters({ ...filters, formation: value === "" ? null : value, });
  };
  const handleSearchFormationNameChange = (value) => {
    console.log(input.search_formation_name)
    setFilters({ ...filters, formation: input.search_formation_name === "" ? null : input.search_formation_name, });
    // setInput((prev) => ({
    //     ...prev,
    //     search_formation_name : "",
    // }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
        ...prev,
        [name]: value,
    }));
};

  const handleResetFilters = () => {
    // Réinitialiser tous les filtres
    setFilters({
      region: null,
      annee: null,
      academy: null,
      departement: null,
      commune: null,
      status_institution: null,
      etablissement: null,
      formation_selectivity: null,
      formation: null,
    });
    fetchOptions();
  }

  return (
    
    // <!-- Main Sidebar Container -->
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* <!-- Brand Logo --> */}
    <a href="index3.html" className="brand-link">
      <img src={require('./img/kaleinnoLogo.webp')} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}}/>
      <span className="brand-text font-weight-light">aléinno</span>
    </a>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-2 d-flex">
        <div className="image">
          <img src={require('./img/user2-160x160.jpg')} className="img-circle elevation-2" alt="User Image"/>
          
        </div>
        <div className="info">
          <a href="#" className="d-block">Alexander Pierce</a>
        </div>
      </div>

      {/* <!-- SidebarSearch Form --> */}
      <div className="form-inline">
        <div className="input-group" data-widget="">
          <input name="search_formation_name" onChange={handleInput} className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
          <div className="input-group-append">
            <button onClick={handleSearchFormationNameChange} className="btn btn-sidebar">
              <i className="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column aside-menu-ul" data-widget="treeview" role="menu" data-accordion="false">
          {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
          
          {/* <li className="nav-item mb-1 active">
            <a className="nav-link">
              <i className="nav-icon fas fa-filter"></i>
              <p>
                Filtres
              </p>
            </a>
          </li> */}

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

          {/* Filtre Région */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Région</p>
            </a>
            <select className="custom-select"  onChange={(e) => handleRegionChange(e.target.value)}>
            <option value=""> Toutes </option>
            {data.regions && data.regions.map((region) => (
              <option key={region} value={region}>
                {region}
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
            <option value=""> Toutes </option>
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
            <option value=""> Tous </option>
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
            <option value=""> Toutes </option>
            {data.communes && data.communes.map((commune) => (
              <option key={commune} value={commune}>
                {commune}
              </option>
            ))}
            </select>
          </li>

          

          {/* Filtre Type d'Établissement */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-school"></i>
              <p>Secteur établissement</p>
            </a>
            <select className="custom-select" onChange={(e) => handleStatusInstititutionChange(e.target.value)}>
            <option value=""> Tous </option>
            {data.status_institutions && data.status_institutions.map((status_institution) => (
              <option key={status_institution} value={status_institution}>
                {status_institution}
              </option>
            ))}
            </select>
          </li>

          {/* Filtre d'Établissements */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-school"></i>
              <p>Établissement</p>
            </a>
            <select className="custom-select" onChange={(e) => handleEtablissementChange(e.target.value)}>
            <option value=""> Tous </option>
            {data.etablissements && data.etablissements.map((etablissement) => (
              <option key={etablissement} value={etablissement}>
                {etablissement}
              </option>
            ))}
            </select>
          </li>

          {/* Filtre formation selective */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-school"></i>
              <p>Formation sélective</p>
            </a>
            <select className="custom-select" onChange={(e) => handleFormationSelectivityChange(e.target.value)}>
            <option value=""> Toutes </option>
            {data.formation_selectivities && data.formation_selectivities.map((formation_selectivity) => (
              <option key={formation_selectivity} value={formation_selectivity}>
                {formation_selectivity == true ? "Oui" : "Non"}
              </option>
            ))}
            </select>
          </li>


          {/* Filtre formations */}
          <li className="nav-item mb-4">
            <a className="nav-link">
              <i className="nav-icon fas fa-school"></i>
              <p>Formations</p>
            </a>
            <select className="custom-select" onChange={(e) => handleFormationChange(e.target.value)}>
            <option value=""> Toutes </option>
            {data.formations && data.formations.map((formation) => (
              <option key={formation} value={formation}>
                {formation}
              </option>
            ))}
            </select>
          </li>

          {/* Bouton Appliquer les Filtres */}
          <li className="nav-item mb-2">
            <button onClick={(e) => handleResetFilters(e.target.value)} className="btn btn-primary btn-block">
              Réinitialiser
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