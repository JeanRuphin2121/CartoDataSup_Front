import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';
import Setting from './Setting';
import PublicVsPrivate from '../../pages/user/insights/PublicVsPrivate';

export default function Template() {
  return (
    
      <div className="wrapper">

        {/* <div className="preloader flex-column justify-content-center align-items-center">
          <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
        </div> */}

        <Header />
        <Aside />
        {/* <Dashboard /> */}
        <PublicVsPrivate />
        <Footer />
        <Setting />
      </div>
    
    
  );
}

