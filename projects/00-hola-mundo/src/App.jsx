import { useState } from "react";
import "./App.css";
import { TwiterFollowCard } from "./TwiterFollowCard";


const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Duran',
    isFollowing: true,
  },
  {
    userName: 'rociobll',
    name: 'Rocio Bahamonde',  
    isFollowing: false,
  },
  {
    userName: 'elPerroVerde', 
    name: 'El Perro Verde',
    isFollowing: true,
  },
  { userName: 'reactjs',
    name: 'React',
    isFollowing: false,
  }

]

//tenemos el app que contiene el componente del TwiterFollowCard, los 2 tienen un estado, aquitenemos elestado de la app
//y  lo inicializamos como false. Este estado no se propaga para abajo
export function App() {
  //const [isFollowing, setIsFollowing] = useState(false); //devuelve un array con el valor del estado y una función para actualizarlo
  const[name, setName] = useState('midudev'); //devuelve un array con el valor del estado y una función para actualizarlo

  console.log('render with name: ', name)
  const midudev = { isFollowing: true, userName: 'midudev' }
 //pasar toda dlas props juntas con spread operator- normalmente no se hace
  return (
    <section className="App">
      {
        users.map(( {userName, name, isFollowing}) => (
          <TwiterFollowCard
            key={userName}     /*utilizamos el userName pq va a ser único*/
            userName={userName}
            initialIsFollowing={isFollowing}
            >
              {name}
          </TwiterFollowCard>
        ))
      }

      {/* ejemplo antes de ussar randerizado de listas */ }
      <TwiterFollowCard {...midudev}>  
        <h1>Miguel Ángel Duran</h1> 
      </TwiterFollowCard>

      <TwiterFollowCard
        isFollowing   /* para indicar el estado incial*/ 
        userName={name}>
        <h1>Miguel Ángel Duran</h1>
      </TwiterFollowCard>

      <TwiterFollowCard
        
        isFollowing={false}
        userName="rociobll">
         ROCIO
      </TwiterFollowCard>

      <TwiterFollowCard
        isFollowing
        userName="elPerroVerde">
        El Perro Verde
      </TwiterFollowCard>

      <button onClick= {()=> setName('elPerroVerde')}>
       Cambio de nombre
      </button>

    
    </section>

    /*  <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img 
                className='tw-followCard-avatar'
                alt="Imagen chica con móvil" src="https://imgs.search.brave.com/OPZna1SnQ3RzEjDIs2OFjop-_fW0Q5M35mvWcBJzf1w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ4/MTg1MTU2Ni9lcy9m/b3RvL2FsZWdyZS1t/dWplci1tZWRpYW5h/LWFkdWx0YS1tb3N0/cmFuZG8tc3UtZm90/by1lbi1zdS10ZWwl/QzMlQTlmb25vLW0l/QzMlQjN2aWwuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUQ3/UEdrcWNvTU5QYmVx/ZmpCTVIzclBPWTRk/TnpyLUtySlBSQTlf/SzBLYmc9"  />
                <div className='tw-followCard-info'>
                    <strong>Rocio Bahamonde</strong>
                    <span className='tw-followCard-infoUserName'>
                        @rociobll
                    </span>
                </div>
            </header>

        <aside>
            <button className='tw-followCard-button'>
                Seguir
            </button>
        </aside>

        </article>
 */
  );
}
