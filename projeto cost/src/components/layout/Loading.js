import style from './Loading.module.css'

function Loading (){
    return(
    <div className={style.loader_container}>
        <img  className={style.loader}
         src=' https://raw.githubusercontent.com/matheusbattisti/curso_react_yt/d36606ba5a99d655cc901698337f1ad432da60c6/src/img/loading.svg'
          alt='Loading' />
    </div>
    )
}

export default Loading;