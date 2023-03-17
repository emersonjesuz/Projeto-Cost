
import style from '../project/projectCard.module.css'

function ServiceCard ({id, name, cost, description,  handleRemove}){
   
   function remove(e){
    e.preventDefault()
    handleRemove(id, cost)
   }

    return (
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R$ {cost}
            </p>
            <p>
                {description}
            </p>
            <div className={style.project_card_actions}>
                <button onClick={remove}>
                <img src='https://cdn-icons-png.flaticon.com/512/1799/1799391.png' alt='excluir'/>
                excluir
                </button>
            </div>
        </div>
    )
}
export default ServiceCard;