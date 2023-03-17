import Message from "../layout/Message";
import LinkButton from "../layout/linkButton";
import ProjectCard from "../project/projectCard";
import Loading from "../layout/Loading";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import style from './Project.module.css'

function Project (){

    const [project, setProject] = useState([])
    const [messageRemove, setMessageRemove] = useState('')
    const [removeLoader, setRemoveLoader] = useState(false)
    const location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        fetch('http://localhost:5000/projects',{
            method:'GET',
            headers:{'Content': 'application/json',},
        })
        .then( response => response.json())
        .then(data=>{
            setProject(data)
            setRemoveLoader(true)
        })
        .catch(err => alert(err))
    },[])

    function removendoProject (id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers:{'Content': 'application/json',}
        })
        .then(response => response.json())
        .then(data =>{
           setProject(project.filter((proje)=> proje.id !== id))
           setMessageRemove('Projeto removido com sucesso!')
        })
        .catch(err => alert(err))
    }

    return(
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to={'/newproject'} text={'Criar Projeto'} />
               
            </div>
            <div className={style.message}>
                {message && <Message type='success' msg={message} />}
                {messageRemove && <Message type='success' msg={messageRemove} />}
            </div>
            <div className={style.container}>
               {
                project.length > 0 &&
                    project.map((proje)=>(
                        <ProjectCard
                        id={proje.id}
                        name={proje.name}
                        budget={proje.budget}
                        category={proje.category}
                        key={proje.id} 
                        handlRemove={removendoProject}  />
                ))}
                {!removeLoader && <Loading/> }
                {removeLoader && project.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </div>
        </div>
    )
}

export default Project;