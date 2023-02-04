import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { search } from "../../redux/actions";
import "./SearchBar.css";

import Swal from 'sweetalert2';
import Error_Search from './Error_Search.jpg'

function Search() {
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector(state => state.products)

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
    e.preventDefault();
      setName(e.target.value);
      let filteredProducts = products.filter(
        (p) => p.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSuggestions(filteredProducts);
  }

  function handleSearch(e) {
    e.preventDefault();
    let findProduct = products.find(
      (p) => p.name.toLowerCase().includes(name.toLowerCase()) 
    ); //busca el nombre dentro de la array de data

    if (!name) {
      showAlertNoEnter();
      return;
    }
    
    if (findProduct) {
      dispatch(search(name)); //si lo encuentra se dispara la accion ####
      history.push(`/product/${findProduct.id}`); //despues redirige para ver el detalle
      // console.log(findProduct);
    } else if (!findProduct) {
      showAlertNoName();
    }
    setName("");//vacia el input
    setSuggestions([]); 
  }

  function handleSuggestionClick(id) {
    history.push(`/product/${id}`);
    setName("");//vacia el input
    setSuggestions([]); 
  }

  return (
    <div className="searchContainer">
      <div className="search_inputSuggest">
        <input
          id="search"
          className="searchBar"
          type="text"
          placeholder="Search by name"
          onChange={(e) => handleInputChange(e)}
          value={name}
        />
        <div className="search_suggestion_div">
        <datalist className="suggestionsList">
          {suggestions.slice(0, 10).map(s => ( //shows just 10 suggestions
            <option className="suggestionsList_item" key={s.id} onClick={() => handleSuggestionClick(s.id)}>
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

