import { Link } from "react-router-dom";
import './Navbar.module.css'

function Navbar (){
    return(
        <header>
        
          <Link  to='/'>
            <img src={'https://raw.githubusercontent.com/matheusbattisti/curso_react_yt/16_projeto_costs/src/img/costs_logo.png'} alt='logo'/>
          </Link>
         <ul className="navBar">
            <li className="list">
                <Link  to='/'>Home</Link>
            </li>
            <li className="list">
                <Link  to='/project'>Projetos</Link>
            </li>
            <li className="list">
                <Link  to='/company'>Empresa</Link>
            </li>
            <li className="list">
                <Link  to='/contact'>Contato</Link>
            </li>
         </ul>
      </header>
    )
}

export default Navbar;