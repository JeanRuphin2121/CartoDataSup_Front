import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {  Line, Bar, Pie,    } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../../../constants/constant';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFilters } from '../../../hooks/FilterProvider';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FormationsAdmissionRate = () => {

  const { filters, setFilters } = useFilters();

  const [data, setData] = useState([]);

  const { user, token, logOut } = useAuth();

  const [showLabels, setShowLabels] = useState(false);
  const chartRef = useRef()

  useEffect(() => {
    // setFilters({ ...filters, commune:"Rennes", });
    fetchStats();
  }, [filters.formation_searched, filters.annee, filters.academy, filters.departement, filters.commune, filters.region, filters.status_institution, filters.etablissement,  filters.formation_selectivity, filters.formation]);

  // Fonction pour récupérer les données statistiques et préparation pour les graphiques
  const fetchStats = async () => {
    try {
        console.log("token", token);
        const response = await axios.get(API_BASE_URL + "formations/stats/?tri=admission_rate", 
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
  const dataAdmissions = {
    labels: data.map(item => item.formation_name), // ou établissement
    datasets: [
      {
        label: "Admissions totales",
        data: data.map(item => item.admitted_total),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Taux d'admission",
        data: data.map(item => item.admission_rate),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };
  

  // const handleExport = () => {
  //   setShowLabels(true);

  //   setTimeout(() => {
  //     const chart = chartRef.current;

  //     if (!chart || !chart.canvas) {
  //       console.error("Chart ref or canvas is null");
  //       setShowLabels(false);
  //       return;
  //     }

  //     const url = chart.canvas.toDataURL("image/png", 1);
  //     const link = document.createElement("a");
  //     link.download = "graphique.png";
  //     link.href = url;
  //     link.click();

  //     setShowLabels(false);
  //   }, 300);
  // };


  return (
<div className="content-wrapper">
    {/* <!-- Content Header (Page header) --> */}

    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Taux d'admission</h1>
            <p className="m-0">Combien d'admis par rapport à la candidature totale</p>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/public-vs-private">Accueil</a></li>
              <li className="breadcrumb-item active">Taux d'admission</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    {/* <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <button onClick={() => setShowLabels(prev => !prev)}>
            {showLabels ? "Masquer les valeurs" : "Afficher les valeurs"}
          </button>

        </div>
      </div>
    </div> */}

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
                <h3 className="card-title">Total des admissions</h3>

                <div className="card-tools">
                  
                  {/* <button onClick={handleExport}>Exporter</button> */}

                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div  className="card-body bar-chart-card-body">
                <div className="chart bar-chart">

                <Bar  
                        ref={(el) => {
                          if (el) chartRef.current = el.chartInstance || el;
                        }}

                        data={dataAdmissions} 
                        options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          datalabels: showLabels
                          ? {
                              anchor: 'end',
                              align: 'top',
                              formatter: (value) => value,
                              color: '#000',
                              font: {
                                weight: 'bold',
                                size: 12,
                              },
                            }
                          : false, // désactive les labels
                            legend: { position: 'top' },
                            title: { display: true, text: 'Admissions totales' },
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
                <h3 className="card-title">Taux d'admission</h3>

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

              
                <table id="example1" className="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Formation</th>
                      <th>Candidatures</th>
                      <th>Admission totale</th>
                      <th>Taux d'admission (%)</th>
                    </tr>
                    </thead>
                    <tbody>

                    {data && data.map((item, index) => {
                      
                      return (
                        <tr key={index}>
                          <td>{item.formation_name}</td>
                          <td>{item.total_candidates}</td>
                          <td>{item.admitted_total}</td>
                          <td>{item.admission_rate}</td>
                        </tr>
                      );
                    })}
                    
                    </tbody>
                    <tfoot>
                    <tr>
                    <th>Formation</th>
                      <th>Candidatures</th>
                      <th>Admission totale</th>
                      <th>Taux d'admission (%)</th>
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

export default FormationsAdmissionRate;
