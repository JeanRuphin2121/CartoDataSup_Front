import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import $ from "jquery";

export default function Dashboard() {

  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Stocke l'instance du graphique


  useEffect(() => {
    // Vérifier si jQuery fonctionne
    console.log("jQuery version:", $.fn.jquery);

    // 🔴 Détruire l'ancienne instance si elle existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // AREA CHART
    const areaChartCanvas = document.getElementById("areaChart2").getContext("2d");
    const areaChartData = {
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

    // 🔵 Créer un nouveau graphique
    chartInstance.current = new Chart(areaChartCanvas, {
      type: "line",
      data: areaChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false } },
          y: { grid: { display: false } },
        },
      },
    });

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
      {/* <!-- /.container-fluid --> */}
    </div>
    {/* <!-- /.content-header --> */}

    {/* <!-- Main content --> */}
    <section className="content">
      <div className="container-fluid">
        {/* <!-- Small boxes (Stat box) --> */}
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

          {/* <div className="col-md-3">
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
          </div> */}

          
          
        </div>
        
        {/* <!-- Main row --> */}
        <div className="row">

            <div > Content to put here</div>
          
        </div>
        {/* <!-- /.row (main row) --> */}
      </div>
      {/* <!-- /.container-fluid --> */}
    </section>
    {/* <!-- /.content --> */}

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
                  <canvas id="areaChart2" ref={chartRef} style={{minHeight: "250px", height: "250px", maxHeight: "250px", maxWidth: "100%"}}></canvas>
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