import LinkButton from '../layout/linkButton';
import style from './Home.module.css'

function Home (){
    return (
    <section className={style.home_conteiner}>
        <h1>Bem-vindo ao <span>Cost</span></h1>
        <p>Comece a gerenciar os seus projetos agora mesmo!</p>
        <LinkButton to='/newproject' text='Criar projeto'/>
        <img src='https://raw.githubusercontent.com/matheusbattisti/curso_react_yt/16_projeto_costs/src/img/savings.svg' alt='cost'/>
    </section>
    )
}

export default Home;