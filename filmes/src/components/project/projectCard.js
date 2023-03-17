import { Link } from 'react-router-dom'
import style from './projectCard.module.css'

function projectCard ({id, name, budget, category, handlRemove}){
    
    function remove (e){
        e.preventDefault()
        handlRemove(id)
    }
    
    return(
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={style.category_text}>
                <span className={`${style[category.name.toLowerCase()]}`}></span> {category.name}
            </p>
            <div className={style.project_card_actions}>
                <Link to={`/projects/${id}`}>
                    <img src={'https://cdn-icons-png.flaticon.com/512/1159/1159633.png'} alt='editar'/>
                    Editar
                </Link>
                <button onClick={remove}>
                    <img src='https://cdn-icons-png.flaticon.com/512/1799/1799391.png' alt='excluir'/>
                    Remover
                </button>
            </div>
            
        </div>
    )
}
export default projectCard