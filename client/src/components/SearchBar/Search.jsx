import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { search } from "../../redux/actions";
import "./SearchBar.css";

function Search() {
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector(state => state.products)

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
      alert("Please, enter some name");
    }
    
    if (findProduct) {
      dispatch(search(name)); //si lo encuentra se dispara la accion ####
      history.push(`/products/${findProduct.id}`); //despues redirige para ver el detalle
    } else if (!findProduct) {
      alert("That Product doesnt exist");
    }
    setName("");
    setSuggestions([]); //vacia el input
  }

  function handleSuggestionClick(id) {
    history.push(`/products/${id}`);
  }

  return (
    <div className="searchContainer">
      <div className="search_inputSuggest">
        <input
          className="searchBar"
          type="text"
          placeholder="Search by name"
          onChange={(e) => handleInputChange(e)}
          value={name}
        />
       {suggestions.length > 0 && (
      <div className="search_suggestion_div">
        <ul className="suggestionsList">
          {suggestions.slice(0, 10).map(s => (
            <li className="suggestionsList_item" key={s.id} onClick={() => handleSuggestionClick(s.id)}>
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    )}

      </div>
      <button className="btnSearch" onClick={(e) => handleSearch(e)}>
        Buscar
      </button>
      
    </div>
  );
}

export default Search;
