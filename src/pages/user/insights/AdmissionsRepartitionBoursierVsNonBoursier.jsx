import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Line, Bar, Pie,    } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../../../constants/constant';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFilters } from '../../../hooks/FilterProvider';
import { Link } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdmissionsRepartitionBoursierVsNonBoursier = () => {

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
        const response = await axios.get(API_BASE_URL + "admissions/repartition/", 
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

  const nonboursiers = data.total_admitted - data.boursiers;

  const chartData = {
    labels: ['Boursiers', 'Non Boursiers',],
    datasets: [
      {
        data: [data.boursiers, nonboursiers],
        backgroundColor: ['#36A2EB', '#FFCE56',],
      },
    ],
  };

  const pieData = {
    labels: ['Boursiers', 'Non Boursiers',],
    datasets: [
      {
        data: [data.boursiers, nonboursiers,],
        backgroundColor: ['#36A2EB', '#FFCE56',],
      },
    ],
  };

  const total = data.total_admitted;
  const pieDataPercent = {

    labels: ['Boursiers', 'Non Boursiers',],
    datasets: [
      {
        data: [(data.boursiers / total) * 100, (nonboursiers  / total) * 100,],
        backgroundColor: ['#36A2EB', '#FFCE56',],
      },
    ],
  };

  return (


      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}

        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Impact du statut boursier sur l’admission</h1>
                <p className="m-0">Analyser l’égalité d’accès aux formations</p>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/dashboard">Accueil</Link></li>
                  <li className="breadcrumb-item active">Impact du statut boursier sur l’admission</li>
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
                    <h3 className="card-title">Répartition des admis par type de Bac</h3>

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

                    <Bar data={chartData} options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: 'top' },
                                title: { 
                                  display: true, 
                                  // text: 'Comparaison des indicateurs par statut d’établissement'
                                },
                            }, }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

                    </div>
                  </div>
                </div>
                  
              </div>

              <div className="col-md-6">

                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Répartition des admis par type de Bac</h3>

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

                    <Pie data={pieData} options={{
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
                    <h3 className="card-title">Répartition des admis par type de Bac (en %)</h3>

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

                    <Pie data={pieDataPercent} options={{
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

export default AdmissionsRepartitionBoursierVsNonBoursier;
