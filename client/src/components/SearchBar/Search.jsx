import React, { useState } from "react";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions";

import Swal from 'sweetalert2';
import Error_Search from './Error_Search.jpg'

function Search() {
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const filteredProducts = useSelector(state => state.products)

  const showAlertNoEnter=()=> {
    Swal.fire({
      //icon:'warning',
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: 'Hubo un error en la búsqueda.',
      title: 'Buscador de Yazz', 
      html:'<h3>Por favor, ingresá un nombre</p>', 
      footer:'<p>Probá de nuevo.</p>'
    }
    )
  }

  const showAlertNoName=()=> {
    Swal.fire({
      //icon:'warning',
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: 'Hubo un error en la búsqueda.',
      title: 'Buscador de Yazz', 
      html:'<h3>Esa banda no tiene ningún show programado</p>', 
      footer:'<p>Probá con otra banda.</p>'
    }
    )
  }

  function handleInputChange(e) {
    //setea el name con lo que va escribiendo el usuario
   // e.preventDefault();
      setName(e.target.value);
      let filtered = filteredProducts.filter(
      (p) => p.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSuggestions(filtered);
  }

  function handleSearch(e) {
    e.preventDefault();
      if (!name) {
      showAlertNoEnter();
      return;
    }
   
    dispatch(actions.search(name));
    setName("");//vacia el input
    setSuggestions([]); 
    history.push("/shows");
   
  }

  function handleSuggestionClick(name) {
    //history.push(`/product/${id}`);
//    history.push("/shows");
     dispatch(actions.search(name));
     setName("");//vacia el input
    setSuggestions([]); 
     history.push("/shows");
  }

  return (
    <div className="searchContainer">
      <div className="search_inputSuggest">
        <input
          id="search"
          className="searchBar"
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => handleInputChange(e)}
          value={name}
        />
        <div className="search_suggestion_div">
        <datalist className="suggestionsList">
          {suggestions.slice(0, 10).map(s => ( //shows just 10 suggestions
            <option className="suggestionsList_item" key={s.id} onClick={() => handleSuggestionClick(s.name)}>
              {s.name}
            </option>
          ))}
        </datalist>
      </div>
      </div>
      <button className="btnSearch" onClick={(e) => handleSearch(e)}>
        Buscar
      </button>
      
    </div>
  );
}

export default Search;

/*import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch({ type: 'SEARCH_SHOWS', payload: searchTerm });
  };

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const Shows = () => {
  const shows = useSelector(state => state.shows);

  return (
    <div>
      {shows.map(show => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default Shows;
*/