import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Project from './components/pages/Project';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import './App.css'
import Proje from './components/pages/proje';

function App() { 
  return (
    <Router>
      <div className='conteiner'>
        <Navbar/>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route  path='/project' element={<Project/>} />
            <Route  path='/company' element={<Company/>} />
            <Route  path='/contact' element={<Contact/>} />
            <Route  path='/newproject' element={<NewProject/>} />
            <Route  path='/projects/:id' element={<Proje/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;


//  imagems
// moeda  https://raw.githubusercontent.com/matheusbattisti/curso_react_yt/16_projeto_costs/src/img/costs_logo.png
// loading  https://raw.githubusercontent.com/matheusbattisti/curso_react_yt/d36606ba5a99d655cc901698337f1ad432da60c6/src/img/loading.svg
// imagem do porquinho  https://raw.githubusercontent.com/matheusbattisti/curso_react_yt/16_projeto_costs/src/img/savings.svg
