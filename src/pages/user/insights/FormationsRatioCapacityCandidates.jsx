import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Line, Bar, Pie,    } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../../../constants/constant';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFilters } from '../../../hooks/FilterProvider';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FormationsRatioCapacityCandidates = () => {

  const { filters, setFilters } = useFilters();

  const [data, setData] = useState([]);

  const { user, token, logOut } = useAuth();

  useEffect(() => {
    // setFilters({ ...filters, commune:"Rennes", });
    fetchStats();
  }, [filters.annee, filters.academy, filters.departement, filters.commune, filters.region, filters.status_institution, filters.etablissement,  filters.formation_selectivity, filters.formation]);

  // Fonction pour récupérer les données statistiques et préparation pour les graphiques
  const fetchStats = async () => {
    try {
        console.log("token", token);
        const response = await axios.get(API_BASE_URL + "formations/stats/", 
            {
                params: filters,
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
        setData(response.data);
        console.log("data", response.data); 

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
  const dataCapacityBar = {
    labels: data.map(item => item.formation_name), // ou établissement
    datasets: [
      {
        label: "Capacité d’accueil",
        data: data.map(item => item.capacity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Histogram data - Formations, Candidatures, etc.
  const dataCandidatesBar = {
    labels: data.map(item => item.formation_name), // ou établissement
    datasets: [
      {
        label: "Candidatures totales",
        data: data.map(item => item.total_candidates),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Histogram data - Formations, Candidatures, etc.
  const dataRatioBar = {
    labels: data.map(item => item.formation_name), // ou établissement
    datasets: [

      {
        label: "Capacité d’accueil",
        data: data.map(item => item.capacity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Candidatures totales",
        data: data.map(item => item.total_candidates),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Ratio Capacité d’accueil / Candidatures",
        data: data.map(item => item.ratio),
        backgroundColor: "rgba(235, 54, 196, 0.6)",
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
            <h1 className="m-0">Ratio Capacité - Candidats</h1>
            <p className="card-title">Analyse de la sélectivité des formations. Les formations qui attirent le plus de candidatures comparé à leur capacité d'accueil</p>

          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/public-vs-private">Accueil</a></li>
              <li className="breadcrumb-item active">Ratio capacité / Candidats</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    {/* <div>
      <h2>Filtres sélectionnés</h2>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </div> */}

    {/* <section>
      <div className="container-fluid">
        <div className="row">
    
          <div className="col-md-12">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Capacité d'accueil</h3>

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

                <Bar data={dataCapacityBar} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Capacité d\'accueil' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          
        </div>
      </div>
    </section>

    <section>
      <div className="container-fluid">
        <div className="row">
    
          <div className="col-md-12">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Candidatures totales</h3>

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

                <Bar data={dataCandidatesBar} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Candidatures totales' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          
        </div>
      </div>
    </section> */}

    <section>
      <div className="container-fluid">
        <div className="row">
    
          <div className="col-md-12">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Ratio Capacité / candidats</h3>

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

                <Bar data={dataRatioBar} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Ratio capacité d\accueil / Candidatures' },
                        }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                </div>
              </div>
            </div>
              
          </div>

          
        </div>
      </div>
    </section>


    <section>
      <div className="container-fluid">
        <div className="row">
    
          <div className="col-md-12">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Ratio Capacité / candidats</h3>
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

              
                <table id="example1" className="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Formation</th>
                      <th>Capacité</th>
                      <th>Candidatures</th>
                      <th>Ratio Capacité / Candidatures</th>
                    </tr>
                    </thead>
                    <tbody>

                    {data && data.map((item, index) => {
                      const ratio = item.total_candidates
                        ? item.capacity / item.total_candidates
                        : 0;
                      let bgColor = ratio >= 1 ? "#d4edda" : ratio >= 0.5 ? "#fff3cd" : "#f8d7da";
                      return (
                        <tr key={index} style={{ backgroundColor: bgColor }}>
                          <td>{item.formation_name}</td>
                          <td>{item.capacity}</td>
                          <td>{item.total_candidates}</td>
                          <td>{ratio.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                    
                    </tbody>
                    <tfoot>
                    <tr>
                      <th>Formation</th>
                      <th>Capacité</th>
                      <th>Candidatures</th>
                      <th>Ratio Capacité / Candidatures</th>
                    </tr>
                    </tfoot>
                </table>


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

export default FormationsRatioCapacityCandidates;
