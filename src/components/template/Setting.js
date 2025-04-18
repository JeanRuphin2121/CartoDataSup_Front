import { Link } from "react-router-dom";

export default function Setting() {
  return (
    <aside className="control-sidebar control-sidebar-dark p-3" style={{overflow: "scroll", maxHeight: "600px"}}>


      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <li className="nav-item">
            <a href="/dashboard" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Formations
              </p>
            </a>
          </li>

          <li className="nav-item">
            <a href="/public-vs-private" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Comparaison Public vs Privé
              </p>
            </a>
          </li>
          
          <li className="nav-item">
            <Link to="formations/repartions-geo" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Répartition géographique du nombre de formations
              </p>
            </Link>
          </li>

          <li className="nav-item">           
            <Link to="formations/candidates" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Répartition des candidats par formation
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="formations/ratio-capacity-candidates" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Ratio capacité d’accueil / Nbre Candidats
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="formations/filling-rate" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Taux de remplissage des formations
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="formations/admission-rate" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Taux d’admission par formation
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="admissions/repartition/type-bac" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
                Répartition des admis par type de bac
              </p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="admissions/repartition/mention" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
                Répartition des admis par mention
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="admissions/repartition/boursiers-vs-nonBoursiers" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Impact du statut boursier sur l’admission
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="admissions/repartition/females" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Proportion filles-garcons dans les admissions
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="admissions/repartition/delais-admission" className="nav-link">
              <i className="nav-icon fas fa-chart-line"></i>
              <p>
              Analyse des délais d’admission
              </p>
            </Link>
          </li>

          
          
        </ul>
      </nav>


    </aside>
  );
}