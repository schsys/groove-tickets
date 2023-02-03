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
      history.push(`/product/${findProduct.id}`); //despues redirige para ver el detalle
      // console.log(findProduct);
    } else if (!findProduct) {
      alert("That Product doesnt exist");
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
