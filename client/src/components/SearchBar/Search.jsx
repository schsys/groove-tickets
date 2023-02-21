import React, { useState } from "react";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { search } from "../../redux/actions";
import { FaSearch } from "react-icons/fa";
import Error_Search from "../../assets/Error_Search.jpg";

function Search() {
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const filteredProducts = useSelector((state) => state.allProducts);

  const showAlertNoEnter = () => {
    Swal.fire({
      //icon:'warning',
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "Hubo un error en la búsqueda.",
      title: "Buscador de Yazz",
      html: "<h3>Por favor, ingresá un nombre</p>",
      footer: "<p>Probá de nuevo.</p>",
    });
  };

  function handleInputChange(e) {
    //setea el name con lo que va escribiendo el usuario
    // e.preventDefault();
    setName(e.target.value);
    let filtered = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSuggestions(filtered);
    if(e.target.value === ""){
      setSuggestions([])
    }
  }

  function handleSearch(e) {
    if (!name) {
      showAlertNoEnter();
      return;
    }

    dispatch(search(name));
    history.push("/");
    setName(""); //vacia el input
    setSuggestions([]);
  }

  function handleSuggestionClick(name) {
    dispatch(search(name));
    history.push("/");
    setName(""); //vacia el input
    setSuggestions([]);
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
            {suggestions.slice(0, 10).map(
              (
                s //shows just 10 suggestions
              ) => (
                <option
                  className="suggestionsList_item"
                  key={s.id}
                  onClick={() => handleSuggestionClick(s.name)}
                >
                  {s.name}
                </option>
              )
            )}
          </datalist>
        </div>
      </div>
      <button className="btnSearch" onClick={(e) => handleSearch(e)}>
        <FaSearch />
      </button>
    </div>
  );
}

export default Search;