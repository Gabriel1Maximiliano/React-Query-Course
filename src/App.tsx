import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
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
  const query = useQuery(['randomNumber'],getRandomNumberFromApi);
  return (
    <div className="App">
     
      {
        query.isFetching 
        ? (  <h2>Loading...</h2> )
        :( <h2>Número Aleatorio: { query.data }</h2> )
      }

      {
        !query.isLoading && query.isError && ( <h3>{`${ query.error }`}</h3> )
      }
     <button onClick={ () => query.refetch() } disabled={query.isFetching}>
      {
        query.isFetching ? '...' : 'Nuevo número!!'
      }
     </button>
      
    </div>
  )
}


