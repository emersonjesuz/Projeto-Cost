import { v4 as uuidv4} from 'uuid';

import style from './proje.module.css'

import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';


function Proje (){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [service, setService] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [typeMesg, setTypeMesg] = useState()

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
                method: 'GET',
                headers:{
                    'Content-Type' : 'application/json'
                }
            })
            .then((respost)=> respost.json())
            .then((data)=>{
                setProject(data)
                setService(data.services)
            })
            .catch(err=>alert(err))
        },300)
    },[id])

    function removeService(id, cost){
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
        
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((respost)=> respost.json())
        .then(()=>{
            setProject(projectUpdated)
            setService(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
            setTypeMesg('success')
        })
    }

    function toggleProjectForm (){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm (){
        setShowServiceForm(!showServiceForm)
    }

    function createService(){
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setTypeMesg('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project)
        }).then((respost)=> respost.json())
        .then(()=>{
            setShowServiceForm(false)
        })
    }

    function editPost(project){
        setMessage(' ')
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setTypeMesg('error')
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((respost)=> respost.json())
        .then((data)=>{
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado!')
            setTypeMesg('success')
        })
        .catch(err=>alert(err))

    }

    return(<>
        {project.name ?
             (
            <div className={style.proje_details}>
                {message && <Message type={typeMesg} msg={message} /> }
                <div className={style.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={style.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar Projeto':'Fechar'}
                    </button>
                    {!showProjectForm ? 
                    (
                    <div className={style.projec_info}>
                        <p>
                            <span>Categoria:</span>{project.category.name }
                        </p>
                        <p>
                            <span>Total de Orçamento:</span> R$ {project.budget}
                        </p>
                        <p>
                            <span>Total Utilizado:</span> R$ {project.cost}
                        </p>
                    </div>
                    ):
                    (
                    <div className={style.projec_info}>
                       <ProjectForm
                       handleSubmit={editPost}
                       btnText='Concluir edição'
                       projectData={project}  />
                    </div>
                    )}
                </div>
                <div className={style.service_for_container}>
                        <h2>Adicione um serviço</h2>
                        <button className={style.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Adicionar serviço':'Fechar'}
                    </button>
                    <div className={style.projec_info}>
                        {showServiceForm && (
                            <ServiceForm
                            handleSubmit={createService}
                            textBtn={'Adicionar Serviço'}
                            projectData={project}
                            />
                        ) }
                    </div>
                </div>
                <h2>Serviços</h2>
                <div className={style.conteiner_service}>
                  {service.length > 0 &&service.map((serv)=>(
                    <ServiceCard 
                    id={serv.id}
                    name={serv.name}
                    cost={serv.cost}
                    description={serv.description}
                    key={serv.id}
                    handleRemove={removeService}
                     />
                  ))}
                  {
                    service.length === 0 && <p>Nâo há serviços cadastrados</p>
                  }
                </div>
            </div>

             ):(
             <Loading/>
             )}
    </>)
    
}

export default Proje


