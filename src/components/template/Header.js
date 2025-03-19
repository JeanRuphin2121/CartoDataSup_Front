
export default function Header() {
  return (
    
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">Actualiser </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">Profil</a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">Paramètres</a>
        </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
        
        <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
            <i className="fas fa-th-large"></i> &nbsp;
            Liste des indicateurs
            </a>
        </li>
        </ul>
    </nav>


  );
}