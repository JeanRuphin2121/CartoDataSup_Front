import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Line, Bar, Pie,    } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../../../constants/constant';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFilters } from '../../../hooks/FilterProvider';
import { Link } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PublicVsPrivate = () => {

  const { filters } = useFilters();

  const [data, setData] = useState([]);

  const { user, token, logOut } = useAuth();

  useEffect(() => {
    fetchStats();
  }, [filters.formation_searched, filters.annee, filters.academy, filters.departement, filters.commune, filters.region, filters.status_institution, filters.etablissement,  filters.formation_selectivity, filters.formation]);

  // Fonction pour récupérer les données statistiques et préparation pour les graphiques
  const fetchStats = async () => {
    try {
        console.log("token", token);
        const response = await axios.get(API_BASE_URL + "public-vs-private/", 
            {
                params: filters,
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

  // Histogram data - Formations, Candidatures, etc.
  const chartData = {
    labels: data.map(item => item.status),
    datasets: [
      {
        label: 'Formations',
        data: data.map(item => item.nombre_formations),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Candidatures totales',
        data: data.map(item => item.total_candidatures),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Candidatures féminines',
        data: data.map(item => item.total_femmes),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Formations sélectives',
        data: data.map(item => item.nombre_formations_selectives),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
        {
            label: 'Formations non sélectives',
            data: data.map(item => item.nombre_formations_non_selectives),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
        {
            label: 'Admissions',
            data: data.map(item => item.total_admis),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
        {
            label: 'Boursiers',
            data: data.map(item => item.total_boursiers),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
        {
            label: 'Candidats Bac Genéral',
            data: data.map(item => item.total_neo_bac_general),
            backgroundColor: 'rgba(8, 98, 131, 0.5)',
        },
        {
            label: 'Candidats Bac Technologique',
            data: data.map(item => item.neo_bac_techno),
            backgroundColor: 'rgba(25, 206, 86, 0.6)',
        },
        {
            label: 'Candidats Bac Pro',
            data: data.map(item => item.neo_bac_pro),
            backgroundColor: 'rgba(6, 71, 71, 0.6)',
        },
        {
            label: 'Admis boursiers',
            data: data.map(item => item.admitted_boursiers),
            backgroundColor: 'rgba(74, 43, 134, 0.6)',
        },
    ],
  };

  // Pie chart data - Formations
  const pieDataFormations = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.nombre_formations),
        backgroundColor: ["#f56954", "#00a65a", "#f39c12", "#00c0ef"],
      },
    ],
  };

  const pieDataCandidaturesTotales = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.total_candidatures),
        backgroundColor: ["#f56954", "#00a65a", "#f39c12", "#00c0ef"],
      },
    ],
  };

  const pieDataCandidaturesFemmes = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.total_females),
        backgroundColor: ["#e83e8c", "#20c997", "#ffc107", "#6f42c1"],
      },
    ],
  };

  const pieDataFormationsSelectives = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.nombre_formations_selectives),
        backgroundColor: ["#007bff", "#28a745", "#fd7e14", "#6c757d"],
      },
    ],
  };

  const pieDataFormationsNonSelectives = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.nombre_formations_non_selectives),
        backgroundColor: ["#6610f2", "#17a2b8", "#e83e8c", "#20c997"],
      },
    ],
  };

  const pieDataAdmissions = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.total_admis),
        backgroundColor: ["#28a745", "#ffc107", "#dc3545", "#007bff"],
      },
    ],
  };
  

  const pieDataBoursiers = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.total_boursiers),
        backgroundColor: ["#17a2b8", "#ffc107", "#6c757d", "#6610f2"],
      },
    ],
  };
  

  const pieDataNeoBacGeneral = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.total_neo_bac_general),
        backgroundColor: ["#007bff", "#6f42c1", "#20c997", "#f39c12"],
      },
    ],
  };
  

  const pieDataNeoBacTechno = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.neo_bac_techno),
        backgroundColor: ["#00c0ef", "#e83e8c", "#28a745", "#ffc107"],
      },
    ],
  };
  
  const pieDataNeoBacPro = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.neo_bac_pro),
        backgroundColor: ["#dc3545", "#17a2b8", "#6f42c1", "#fd7e14"],
      },
    ],
  };
  

  const pieDataAdmisBoursiers = {
    labels: data.map(item => item.status),
    datasets: [
      {
        data: data.map(item => item.admitted_boursiers),
        backgroundColor: ["#28a745", "#f39c12", "#6610f2", "#00a65a"],
      },
    ],
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
            <h1 className="m-0">Comparaison public Vs privée</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to="/dashboard">Accueil</Link></li>
              <li className="breadcrumb-item active">Comparaison public Vs privée</li>
            </ol>
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
                <h3 className="card-title">Suivant tous les paramètres ( formations, candidatures féminines etc)</h3>

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
                            title: { display: true, text: 'Comparaison des indicateurs par statut d’établissement' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de formations</h3>

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
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>



          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures féminines</h3>

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

                <Pie data={pieDataCandidaturesFemmes} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de formations sélectives</h3>

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

                <Pie data={pieDataFormationsSelectives} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de formations non sélectives</h3>

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

                <Pie data={pieDataFormationsNonSelectives} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre d'admissions</h3>

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

                <Pie data={pieDataAdmissions} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de Candidats boursiers '</h3>

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

                <Pie data={pieDataBoursiers} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures - Bac Général</h3>

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

                <Pie data={pieDataNeoBacGeneral} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures - Bac Technologique</h3>

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

                <Pie data={pieDataNeoBacTechno} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures - Bac Pro</h3>

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

                <Pie data={pieDataNeoBacPro} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre d'admis boursiers</h3>

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

                <Pie data={pieDataAdmisBoursiers} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          


          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Suivant le nombre de candidatures totales</h3>

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

                <Pie data={pieDataCandidaturesTotales} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

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

export default PublicVsPrivate;
