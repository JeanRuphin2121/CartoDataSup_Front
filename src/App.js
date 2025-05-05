import logo from './logo.svg';
import './App.css';
import Template from './components/template/Template';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./components/template/Dashboard";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";
import PublicHome from './pages/public/PublicHome';
import PublicVsPrivate from './pages/user/insights/PublicVsPrivate';
import RatioCapacityCandidates from './pages/user/insights/FormationsRatioCapacityCandidates';
import Formations from './pages/user/insights/Formations';
import FormationsBySector from './pages/user/insights/Formations';
import CandidatesByFormation from './pages/user/insights/FormationsCandidates';
import FormationsCandidates from './pages/user/insights/FormationsCandidates';
import FormationsFillingRate from './pages/user/insights/FormationsFillingRate';
import FormationsAdmissionRate from './pages/user/insights/FormationsAdmissionRate';
import FormationsRatioCapacityCandidates from './pages/user/insights/FormationsRatioCapacityCandidates';
import AdmissionRepartitionTypeBac from './pages/user/insights/AdmissionsRepartitionTypeBac';
import AdmissionRepartitionMention from './pages/user/insights/AdmissionsRepartitionMention';
import AdmissionsRepartitionBoursierVsNonBoursier from './pages/user/insights/AdmissionsRepartitionBoursierVsNonBoursier';
import AdmissionsRepartitionFemales from './pages/user/insights/AdmissionsRepartitionFemales';
import AdmissionsRepartitionBeforeProcedure from './pages/user/insights/AdmissionsRepartitionBeforeProcedure';
import FormationsRepartionGeo from './pages/user/insights/FormationsRepartionGeo';
import ImportData from './pages/user/insights/ImportData';


function App() {
  return (
    <>      
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PublicHome />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Formations />} />
              <Route path="/public-vs-private" element={<PublicVsPrivate />} />
              <Route path="formations/ratio-capacity-candidates" element={<FormationsRatioCapacityCandidates />} />
              <Route path="/formations/candidates" element={<FormationsCandidates />} />
              <Route path="/formations/filling-rate" element={<FormationsFillingRate />} />
              <Route path="/formations/admission-rate" element={<FormationsAdmissionRate />} />
              <Route path="/formations/repartions-geo" element={<FormationsRepartionGeo />} />
              <Route path="/admissions/repartition/type-bac" element={<AdmissionRepartitionTypeBac />} />
              <Route path="/admissions/repartition/mention" element={<AdmissionRepartitionMention />} />
              <Route path="/admissions/repartition/boursiers-vs-nonBoursiers" element={<AdmissionsRepartitionBoursierVsNonBoursier />} />
              <Route path="/admissions/repartition/females" element={<AdmissionsRepartitionFemales />} />
              <Route path="/import" element={<ImportData />} />

              <Route path="/admissions/repartition/delais-admission" element={<AdmissionsRepartitionBeforeProcedure />} />
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>


      {/* <div className="wrapper"> */}

        {/* <div className="preloader flex-column justify-content-center align-items-center">
          <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
        </div> */}

        {/* <Template />

      </div> */}
    
    </>
  );
}

export default App;
