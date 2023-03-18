import { useNavigate}  from 'react-router-dom'
import ProjectForm from '../project/ProjectForm';
import style from './NewProject.module.css'


function NewProject (){

    const history = useNavigate()
 
    function createPost(project){
        project.cost = 0
        project.services = []

    fetch('http://localhost:5000/projects',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project),
    }).then((resposta) => resposta.json())
    .then((data)=>{
        history('/project', {state:{message: 'projeto criado com sucesso'}})
        
    })
    .catch(err => console.log(err))  
  

    }
    return (
    <div  className={style.newproject_conteiner}>
        <h1>Novo Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços </p>
       <ProjectForm handleSubmit={createPost} btnText={'Criar Projeto'}/>
    </div>
    )
}

export default NewProject;