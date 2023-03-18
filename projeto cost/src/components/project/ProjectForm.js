import { useEffect, useState } from 'react';

import Input from '../form/Input';
import Select from '../form/select';
import SubmitButton from '../form/SubmitButton';
import style from './ProjectForm.module.css'

function ProjectForm ({handleSubmit,btnText, projectData}){

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})
 
  useEffect(()=>{
    fetch('http://localhost:5000/categories',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((resposta) => resposta.json())
    .then((dados) => {
      setCategories(dados)
     
    })
    .catch((err)=> console.log(`ERRO: ${err}
     Recarregue a Pagina`))
  },[])

  const submit = (e) =>{
    e.preventDefault()
    handleSubmit(project)
 
  }

  function handleChange(e){
    setProject({...project, [e.target.name]: e.target.value})
  }
  function handleOrcarmet(e){
    setProject({...project, [e.target.name]: e.target.value})
    

  }
  function handleCategory(e){
    setProject({...project,
      category:{
       id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })

  }

    return (
        <form onSubmit={submit} className={style.form}>
          <Input 
          type={'text'}
          text={'Nome do projeto'}
          name={'name'}
          placeholder={'Insira o nome do Projeto'}
          handleOnChange={handleChange}
          value={project.name ? project.name: ''}   />

          <Input
           type={'number'}
            text={'Orçamento do projeto'}
            name={'budget'}
            placeholder={'Insira o orçamento total'}
            handleOnChange={handleOrcarmet}
            value={project.budget ? project.budget : ''}  />

          <Select
           name={'category_id'}
           text={'selecione a categoria'}
           options={categories}
           handleOnChange={handleCategory}
           value={project.category ? project.category.id : ''}/>
        <SubmitButton  text={btnText}  />

        </form>
    )
}
export default ProjectForm;
