import React, { useEffect, useState } from "react";

import $ from "jquery";

import {  Line, Bar, Pie  } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import axios from "axios";

// 🔵 Enregistrer les modules nécessaires
Chart.register(...registerables);

export default function Dashboard() {

  // 📊 Données pour le Pie Chart
  const pieData = {
    labels: ["Chrome", "Firefox", "Safari", "Opera"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#f56954", "#00a65a", "#f39c12", "#00c0ef"],
      },
    ],
  };

  const lineBarData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Digital Goods",
        backgroundColor: "rgba(60,141,188,0.9)",
        borderColor: "rgba(60,141,188,0.8)",
        data: [28, 48, 40, 19, 86, 27, 90],
      },
      {
        label: "Electronics",
        backgroundColor: "rgba(210, 214, 222, 1)",
        borderColor: "rgba(210, 214, 222, 1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Vérifier si jQuery fonctionne
    console.log("jQuery version:", $.fn.jquery);

    console.log("Chargement des données...");
    axios.get("http://localhost:8000/api/candidatures/")
      .then(response => {
        console.log("Données chargées avec succès:", response.data);
        // Traiter les données pour le graphique
        // Exemple de traitement des données
        // Assurez-vous que la structure des données correspond à ce que vous attendez
        const data = response.data;
        const labels = data.map(item => item.formation.name);
        const values = data.map(item => item.admission_rate);

        setChartData({
          labels: labels,
          datasets: [{
            label: "Taux d'admission (%)",
            data: values,
            backgroundColor: "rgba(75,192,192,0.6)",
          }],
        });
      })
      .catch(error => console.error("Erreur de chargement", error));

  }, []);


  return (
    // <!-- Content Wrapper. Contains page content -->
  <div className="content-wrapper">
    {/* <!-- Content Header (Page header) --> */}

    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Indicateurs</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    {/* <section className="content">
      <div className="container-fluid">

      <div class="row">
          <div class="col-md-12">
            <div class="card card-primary collapsed-card">
              <div class="card-header">

                <h3 class="card-title">Liste des indicateurs</h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>

              </div>

              <div class="card-body pad table-responsive">

                <table class="table table-borderless text-center">
                  <tr>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-success btn-xs">Comparaison Public vs Privé</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Répartition géographique du nombre de formations</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Répartition des candidats par type de formation</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Ratio capacité d’accueil / Nbre Candidats</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Taux de remplissage des formations</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Taux d’admission par formation</button>
                    </td>

                  </tr>
                  <tr>
                    
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Répartition des admis par type de bac</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Répartition des admis par type de bac</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Impact du statut boursier sur l’admission</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Proportion filles-garcons dans les admissions</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Analyse des délais d’admission</button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-block bg-gradient-secondary btn-xs">Secondary</button>
                    </td>
                    
                  </tr>
                  
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section> */}

    {/* <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card card-primary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Comparaison Public vs Privé</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              Voir si les formations privées sont plus sélectives
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Répartition géographique du nombre de formations</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              Visualiser la concentration des formations dans certaines régions
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Répartition des candidats par type de formation</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              Comparer les formations populaires et leur sélectivité
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Ratio capacité d’accueil / Nbre Candidats </h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                Identifier les formations sous tension ou en sous-effectif d'accueil
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Taux de remplissage des formations</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                Voir si certaines formations peinent à remplir leurs places
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Taux d’admission par formation</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              `Identifier les formations les plus compétitives et guider les choix d’orientations
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Répartition des admis par type de bac</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                Profil des admis suivant le type de bac obtenu
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Répartition des mentions des admis</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              Part des admis avec mention (TB, B, AB, sans mention)
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Impact du statut boursier sur l’admission</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              Analyser l'impact du status boursier dans l'accès aux formations
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Proportion filles-garcons dans les admissions</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                Analyser l'impact du genre dans l'accès aux formations

              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Analyse des délais d’admission</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              Comprendre quand les candidats reçoivent leurs propositions d’admission
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card card-secondary collapsed-card">
              <div className="card-header">
                <h3 className="card-title insight-title-h3">Mobilité des étudiants</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              Identifier les académies où les étudiants restent ou partent
              </div>
            </div>
          </div>

        </div>
      </div>
    </section> */}

    <section>
      <div className="container-fluid">
        <div className="row">
    
          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Line Chart</h3>

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

                  <Pie data={pieData} options={options} style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}} />

                </div>
              </div>
            </div>
              
          </div>
          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Line Chart</h3>

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

                  <Bar data={lineBarData} options={options} style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}} />

                </div>
              </div>
            </div>
              
          </div>

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
              <div className="card-body">
                <div className="chart">

                  <Bar data={chartData} />

                </div>
              </div>
            </div>
              
          </div>

          <div className="col-md-6">

            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Line Chart</h3>

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

                  <Line data={lineBarData} options={options} style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}} />

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
}
// Compare this snippet from cartodatasup_react/src/components/layouts/Aside.js: