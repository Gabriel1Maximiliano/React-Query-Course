import { useEffect, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const getRandomNumberFromApi = async ():Promise<number> => {

  try {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
    const numberString = await res.text();
    return +numberString;// el mas parsea
  } catch (error) {
  
    throw new Error('Heeelppp!!!!');
  }
}

export const App =()=> {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceReFetch] = useReducer((x) =>x+1 , 0);
useEffect(() => {
  setIsLoading(true)
getRandomNumberFromApi()
.then( num=>setNumber( num ) )
.catch( error => setError( error.message ) );
 
}, [key]);

useEffect(() => {
if( number ){
  setIsLoading(false);
}
}, [number])

useEffect(() => {
  if( error ){
    setIsLoading(false);
  }
  }, [error])

  return (
    <div className="App">
     
      {
        isLoading 
        ? (  <h2>Loading...</h2> )
        :!error && ( <h2>Número Aleatorio: { number }</h2> )
      }

      {
        !isLoading && error && ( <h3>{error}</h3> )
      }
     <button onClick={ forceReFetch } disabled={isLoading}>
      Nuevo número!!
     </button>
      
    </div>
  )
}


