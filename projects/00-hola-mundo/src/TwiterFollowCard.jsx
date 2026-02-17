import { useState } from "react";   //hooks utilidades de react para en este caso guardar una variable que nos diga si estamos o no siguiendo a ese usuario

export function TwiterFollowCard ( { children, userName= 'unknown', initialIsFollowing} ) { 
    //userName = `@${userName}`; // mala practica modificas la prop - mejor crear constante nueva con otro nombre. no mutar una prop
    //const addAt = (userName)=> `@${userName}`;
    //const imageSrc = `https://unavatar.io/${userName}`  //se pueden pasar una funcion por parámetro
//const state = useState(false); //valor inical dele stado - devuelve un array con el valor del estado y una función para actualizarlo
//const isFollowing = state[0];
//const setIsFollowing = state[1]; // función para actualizar el estado - se le pasa el nuevo valor del estado o una función que reciba el estado anterior y devuelva el nuevo estado
/* DESESTRUCTURACION */
const [isFollowing, setIsFollowing] = useState(initialIsFollowing); //desestructuración del array que devuelve useState

console.log('[TwiterFollowXard] render with userName: ', userName)
    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing 
    ? 'tw-followCard-button is-following' 
    : 'tw-followCard-button';

const handleClick = () => {
    setIsFollowing(!isFollowing); //actualiza el estado con el nuevo valor - en este caso el contrario del valor actual
}

    return (
         <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img 
                className='tw-followCard-avatar'
                alt="Imagen chica con móvil" 
                src={`https://unavatar.io/${userName}`}  />

                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>
                        @{userName}
                    </span>
                </div>
            </header>

        <aside>
            <button className={buttonClassName} onClick={handleClick}>
                
                <span className="tw-followCard-text">{text}</span>
                <span className="tw-followCard-stopFollow">Dejar de seguir</span>
            </button>
        </aside>

        </article>

    )
}