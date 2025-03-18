
export default function Aside() {
  return (
    
    // <!-- Main Sidebar Container -->
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* <!-- Brand Logo --> */}
    <a href="index3.html" className="brand-link">
      <img src="template/dist/img/custom/kaleinnoLogo.webp" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}}/>
      <span className="brand-text font-weight-light">aléinno</span>
    </a>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-2 d-flex">
        <div className="image">
          <img src="template/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" className="d-block">Alexander Pierce</a>
        </div>
      </div>

      {/* <!-- SidebarSearch Form --> */}
      {/* <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div> */}

      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column aside-menu-ul" data-widget="treeview" role="menu" data-accordion="false">
          {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
          
          <li className="nav-item mb-1 active">
            <a className="nav-link">
              <i className="nav-icon fas fa-filter"></i>
              <p>
                Filtres
              </p>
            </a>
          </li>

          {/* Filtre Année */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-calendar"></i>
              <p>Session</p>
            </a>
            <select className="form-control">
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
          </li>
          
          {/* Filtre Académie */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Académie</p>
            </a>
            <select className="form-control">
              <option>Toutes</option>
              <option>Paris</option>
              <option>Lyon</option>
              <option>Marseille</option>
            </select>
          </li>

          {/* Filtre Département */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Département</p>
            </a>
            <select className="form-control">
              <option>Tous</option>
              <option>Vaucluse</option>
              <option>Hautes-Alpes</option>
              <option>Marseille</option>
            </select>
          </li>

          {/* Filtre Commune */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Communes</p>
            </a>
            <select className="form-control">
              <option>Toutes</option>
              <option>Arles</option>
              <option>Aix-en-Provence</option>
              <option>Avignon</option>
            </select>
          </li>

          {/* Filtre Région */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-university"></i>
              <p>Région</p>
            </a>
            <select className="form-control">
              <option>Toutes</option>
              <option></option>
              <option></option>
              <option></option>
            </select>
          </li>

          {/* Filtre Type d'Établissement */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-school"></i>
              <p>Établissement</p>
            </a>
            <select className="form-control">
              <option>Tous</option>
              <option>Public</option>
              <option>Privé</option>
            </select>
          </li>

          {/* Filtre Type de Formation */}
          <li className="nav-item mb-2">
            <a className="nav-link">
              <i className="nav-icon fas fa-graduation-cap"></i>
              <p>Formation</p>
            </a>
            <select className="form-control">
              <option>Toutes</option>
              <option>CPGE</option>
              <option>BTS</option>
              <option>BUT</option>
              <option>Licence</option>
            </select>
          </li>

          {/* Filtre Sélectivité */}
          <li className="nav-item mb-3">
            <a className="nav-link">
              <i className="nav-icon fas fa-filter"></i>
              <p>Formation Sélective</p>
            </a>
            <select className="form-control">
              <option>Oui</option>
              <option>Non</option>
            </select>
          </li>

          {/* Bouton Appliquer les Filtres */}
          <li className="nav-item mb-2">
            <button className="btn btn-primary btn-block">
              <i className="fas fa-filter"></i> Appliquer les filtres
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