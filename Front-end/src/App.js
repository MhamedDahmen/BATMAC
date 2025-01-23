import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Competence from './pages/competence';
import Home from './pages/Home';
import Test from './pages/test';
import TestQuestions from './pages/TestQuestions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tests from './components/Backoffice/Tests';
import BackCompetences from './components/Backoffice/BackCompetences';
import GestionQuestions from './components/Backoffice/GestionQuestions';
import GestionChoices from './components/Backoffice/GestionChoices';
import GestionDomains from './components/Backoffice/GestionDomains';
import GestionSecteur from './components/Backoffice/GestionSecteur';
import GestionUtilisateurs from './components/Backoffice/GestionUtilisateurs';
import Evaluation from './pages/evaluation';
import TestSteps from './pages/TestSteps';
import Domains from './pages/Domains';
import Secteurs from './pages/Secteurs';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminLogin from './pages/AdminLogin';








function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route  path='/' element={<Registration/>} />
     <Route  path='/showCompetence/:idSecteur'  element={<Competence/>} />
     <Route path='/showDomain' element ={<Domains />} />
     <Route path='/showSecteur/:idDomain' element ={<Secteurs />} />
     <Route  path='/tests/:idCompetence' exact  to element ={<Test/>} />
     <Route  path='/tests/questions/:idTest' exact to element={<TestQuestions/>} />
     <Route  path='/competences' exact to element={<BackCompetences/>} />
     <Route  path='/alltests' exact to element={<Tests/>} />
     <Route  path='/backquestions' exact to element={ <GestionQuestions /> } />
     <Route  path='/backchoices' exact to element={ <GestionChoices /> } />
     <Route  path='/backdomaines' exact to element={ <GestionDomains /> } />
     <Route  path='/backsecteur' exact to element={ <GestionSecteur /> } />
     <Route  path='/evaluation' exact to element={ <Evaluation /> } />
     <Route  path='/step' exact to element={ <TestSteps /> } />
     <Route path='/login' exact to element ={<Login/>} />
     <Route path='/users' exact to element ={<GestionUtilisateurs/>} />
     <Route path='/AdminLogin' exact to element ={<AdminLogin/>}/>


     </Routes>
     </BrowserRouter>
    
    </>
  );
}

export default App;
