import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Line, Bar, Pie,    } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../../../constants/constant';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFilters } from '../../../hooks/FilterProvider';
import { Link } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FormationsRepartionGeo = () => {

  const { filters, setFilters } = useFilters();

  const [data, setData] = useState([]);
  
  const { user, token, logOut } = useAuth();
  const [sector, setSector] = useState("region");

  useEffect(() => {
    fetchStats();
  }, [filters.repartition_geo_sector, filters.annee, filters.academy, filters.departement, filters.commune, filters.region, filters.status_institution, filters.etablissement,  filters.formation_selectivity, filters.formation]);

  // Fonction pour récupérer les données statistiques et préparation pour les graphiques
  const fetchStats = async () => {
    try {
        console.log("token", token);
        const response = await axios.get(API_BASE_URL + "repartition-geographique-formations", {

                params: filters, // ou 'academy', 'department_name'
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
        setData(response.data);

    } catch (error) {
      console.error('Erreur chargement données :', error);
        if (error.response && error.response.status === 401) {
            // Si le token est expiré, déconnecter l'utilisateur
            if (error.response.data.code === "token_not_valid") {
              console.log("token not valid");
              logOut();
            }
        }
    }
  };

  
  const handleSectorChange = (value) => {
    setFilters({ ...filters, 
      repartition_geo_sector: value === "" ? null : value,});
    };

  // Histogram data - Formations, Candidatures, etc.
  const chartData = {
    labels: data.map(item => item.lieu),
    datasets: [
      {
        label: "Nombre de formations",
        data: data.map(item => item.nombre_formations),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      }
    ],
  };


  // Pie chart data - Formations
  const pieDataFormations = {
    labels: data.map(item => item.lieu),
    datasets: [{
      data: data.map(item => item.nombre_formations),
      backgroundColor: [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
        "#9966FF", "#FF9F40", "#66BB6A", "#EF5350"
      ],
    }],
  };
  //

  return (
    // <div>
    //   <h2>📊 Statistiques Public vs Privé</h2>

    //   <div style={{ marginBottom: '1rem' }}>
    //     <label>Commune : </label>
    //     <select onChange={e => setCommune(e.target.value)}>
    //       <option value="">Toutes</option>
    //       <option value="Redon">Redon</option>
    //       <option value="Rennes">Rennes</option>
    //       {/* Ajoute plus de communes ici */}
    //     </select>

    //     <label style={{ marginLeft: '1rem' }}>Académie : </label>
    //     <select onChange={e => setAcademie(e.target.value)}>
    //       <option value="">Toutes</option>
    //       <option value="Rennes">Rennes</option>
    //       <option value="Nantes">Nantes</option>
    //       {/* Ajoute plus d'académies ici */}
    //     </select>
    //   </div>

    //   <Bar data={chartData} options={{
    //     responsive: true,
    //     plugins: {
    //       legend: { position: 'top' },
    //       title: { display: true, text: 'Comparaison des indicateurs par statut d’établissement' },
    //     },
    //   }} />
    // </div>







<div className="content-wrapper">
    {/* <!-- Content Header (Page header) --> */}

    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Répartition géographique des formations</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to="/dashboard">Accueil</Link></li>
              <li className="breadcrumb-item active">Répartition géographique des formations</li>
            </ol>
          </div>

        </div>
          <div className="row">
          <div className="col-sm-3">
            <p className="m-0">Combien d'offres de formation par: </p> 
          </div>
          <div className="col-sm-2">
            <select className="custom-select"   onChange={(e) => handleSectorChange(e.target.value)}>
              <option value="region"> Region </option>
                <option key="academy" value="academy">Academy</option>
                <option key="department_name" value="department_name">Département</option>
                <option key="commune" value="commune">Commune</option>
            </select>
          </div>

          </div>
      </div>
    </div>

    {/* <div>
      <h2>Filtres sélectionnés</h2>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </div> */}

    <section>
      <div className="container-fluid">
        <div className="row">
    
          <div className="col-md-12">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Diagramme en bar</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="card-body bar-chart-card-body">
                <div style={{width : "1200px"}} className="chart ">

                <Bar data={chartData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true,  },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          <div className="col-md-12">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title"></h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="chart">

                <Pie data={pieDataFormations} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "500px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

        </div>
      </div>
    </section>


    <section>
      <div className="container-fluid ">
      {/* <!-- Indicateurs Clés (4 cartes alignées) --> */}

        {/* <!-- Boutons d'Action --> */}
        <div className="row text-center">
            <button className="btn btn-primary">🔄 Mettre à jour</button>
            <button className="btn btn-success">📤 Exporter Graphiques</button>
            <button className="btn btn-warning">📩 Télécharger Rapport</button>
        </div>
      </div>
    </section>
  </div>


  );
};

export default FormationsRepartionGeo;
