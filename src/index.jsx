import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=*api_key_here*&limit=10&offset=0&q=";
let GIFSearch = () => {
  const [searchGifs, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loadingGifs, setLoadingState] = useState(false);


  let search = () => {
    if (searchGifs.length > 0) {
      setLoadingState(true);
      fetch(GIPHY_API + searchGifs)
        .then((result) => {
          setLoadingState(false);
          return result.json();
        })
        .then((result) => {
          const parsadeGifs =
            result.data.map(gif =>
              gif.images.fixed_height.url);
          setGifs(parsadeGifs);
        })
        .catch(() => {
          alert("Something went wrong");
          setLoadingState(false);
        })
    }

  }


  useEffect(() => {
    localStorage.setItem("resultSearch", JSON.stringify(searchGifs));
  }, [searchGifs]);



  return (
    <div>
      <div className='namePage'>
        <h1>CSM.gif</h1>
        <img src='https://media3.giphy.com/media/zHokhPIy6lwas/giphy.gif?cid=790b7611c83cd86004cb2169836bca292c5eaf57643769fe&rid=giphy.gif&ct=g' alt="gifss" width={500}></img>
      </div>
      <div className="header">
        <div>
          <input
            type="text"
            placeholder="Search GIF"
            value={searchGifs}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={search}>
            Search
          </button>
        </div>
      </div>
      <div className="result">
        {
          (loadingGifs) ? (
            <div className="loading">
              <div className="loader">
              </div>
            </div>
          ) : (
            <div className="list">
              {
                gifs.map((gif) => {
                  return (
                    <div className="item">
                      <img src={gif} alt="" />
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}


ReactDOM.render(<GIFSearch />, document.querySelector("#root"));