import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Line, Bar, Pie,    } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../../../constants/constant';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFilters } from '../../../hooks/FilterProvider';
import { Link } from "react-router-dom";

import zoomPlugin from "chartjs-plugin-zoom";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, zoomPlugin);

const FormationsBySector = () => {

  const { filters, setFilters } = useFilters();

  const [data, setData] = useState([]);

  const { user, token, logOut } = useAuth();

  useEffect(() => {
    // setFilters({ ...filters, commune:"Rennes", });
    fetchStats();
  }, [filters.formation_searched, filters.annee, filters.academy, filters.departement, filters.commune, filters.region, filters.status_institution, filters.etablissement,  filters.formation_selectivity, filters.formation]);

  // Fonction pour récupérer les données statistiques et préparation pour les graphiques
  const fetchStats = async() => {
    try {
        console.log("token", token);
        const response = await axios.get(API_BASE_URL + "formations/", 
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

  const dataCapacityBar = {
    labels: data.map(item => item.detailed_category), // ou établissement
    datasets: [
      {
        label: "Capacité d’accueil",
        data: data.map(item => item.capacity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
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
            <h1 className="m-0">Formations</h1>
            <p className="m-0">Analyser la sélectivité des formations suivant leur capacité d'accueil</p>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to="/dashboard">Accueil</Link></li>
              <li className="breadcrumb-item active">Formations</li>
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
              <div className="card-body bar-chart-card-body">
                <div className="chart bar-chart">

                <Bar data={dataCapacityBar} 
                
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      
                      plugins: {
                          legend: { position: 'top' },
                          title: { display: true, text: 'Capacité d\'accueil' },
                          
                      }, 
                    }}  style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}/>

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
                <h3 className="card-title">Formations </h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="card-body table-card-body">

              
                <table id="example2" className="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Formation</th>
                      <th>Capacité</th>
                    </tr>
                    </thead>
                    <tbody>

                    

                    {data && data.map((item, index) => {
                      // const ratio = item.total_candidates
                      //   ? item.capacity / item.total_candidates
                      //   : 0;
                      // let bgColor = ratio >= 1 ? "#d4edda" : ratio >= 0.5 ? "#fff3cd" : "#f8d7da";
                      return (
                        // <tr key={index} style={{ backgroundColor: bgColor }}>
                        <tr key={index}>
                          <td>{item.detailed_category}</td>
                          <td>{item.capacity}</td>
                        </tr>
                      );
                    })}
                    
                    </tbody>
                    <tfoot>
                    <tr>
                      <th>Formation</th>
                      <th>Capacité</th>
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

export default FormationsBySector;
