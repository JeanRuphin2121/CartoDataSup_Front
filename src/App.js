import logo from './logo.svg';
import './App.css';
import Template from './components/template/Template';

function App() {
  return (
    <>
      <div className="wrapper">

        {/* <div className="preloader flex-column justify-content-center align-items-center">
          <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
        </div> */}

        <Template />
      </div>
    
    </>
  );
}

export default App;
