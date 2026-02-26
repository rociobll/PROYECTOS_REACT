/* eslint-disable react/react-in-jsx-scope */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useReducer } from 'react';
import type { State, Action } from './types';


// 1. create a inital State
const initialState: State ={
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2. Create reducer
function reducer (state: State, action: Action) {
  const { type } = action
 // si hay un tipo inter generamos elk nuevo estado y lo devolvemos
  if (type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

if (type === 'SET_FROM_LANGUAGE') {
  return {
    ...state,
    fromLanguage: action.payload   // lo siguiente que le queremos pasar en cada accion, la info de la accion (la accion tendra type y payload)

  }
}

if (type === 'SET_TO_LANGUAGE') {
  return {
    ...state,
    toLanguage: action.payload
  }
}

if (type === 'SET_FROM_TEXT') {
  return{
    ...state,
    loading: true,
    fromText: action.payload
  }
}

if (type === 'SET_RESULT') {   // dejamos el estado como esta y solo cambiamos el result con el payload
  return { 
    ...state,
    loading: false,
    result: action.payload
  }
}


// si no se encuentra tipo, devolvemos mismo estado
return state
}

function App() {

// 3. Usar hook useReducer
  const [{  //las acciones que tenemos disponible y el dispatch
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)
  
  console.log({ fromLanguage})
 
  return (
    
      <div className='App'>
        <h1>Google Translate</h1>
        <button onClick={()=> {
          dispatch({ type: 'SET_FROM_LANGUAGE', payload: 'es'})
        }}>Cambiar a español</button>
      </div>
   
  )
}

export default App
