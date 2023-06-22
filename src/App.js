import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./App.css"

function App() {

  const [data, setData] = useState([])
  const [btn, setBtn] = useState(1);
  const [page, setPage] = useState(1);
  const [name, setName] = useState()
  const [name2, setName2] = useState('')
  const [status,setStatus] = useState(true)


  useEffect(() => {
    async function fetchData() {
      try {
        const x = await axios.get(`https://www.omdbapi.com/?s=${name2}&page=${btn}&apikey=5207d4d9`)

        if(x.data.Response === "False"){
          setStatus(false)
          console.log(x.data.Response)
        }else{
          setStatus(true)
          const data = x.data.Search;
          if(status === true){
            const nonNaMovies = data.filter(movie => movie.Poster !== "N/A");
            setData(nonNaMovies);
            setPage((x.data.totalResults / 10)+1)
            // console.log({data})
          }
        }
        } catch (e) {
          console.log(e)
        }
      }
      fetchData();
    },[name2,btn])
    
  const pageArray = Array.from({ length: page }, (_, i) => i + 1);

  return (
    <div className='app'>

      <div className='sear'>
        <input type="text" name={name} onChange={(e) => setName(e.target.value)} placeholder='Search Movie' />
        <button className='sebtn' onClick={() => setName2(name)}>Search</button>
      </div>

      {status === false && <div className='Error'>
        <h1>Ooops! Data not Found</h1>
        </div>}

      { status === true && <div className='conta'>
        {data.map((t) => (
          <div key={t.imdbID} className='space'>
            <img src={t.Poster} alt="" />
            <p >{t.Title} {t.Year}</p>
          </div>
        ))}
      </div>}

      { status === true && <div >
      {pageArray.map((p) => (
          <button className='pages' key={p} onClick={() => setBtn(p)}>
            {p}
          </button>
        ))}
      </div>}


    </div>

  )
}

export default App
