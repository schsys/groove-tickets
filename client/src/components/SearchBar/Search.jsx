import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { search } from "../../redux/actions";
import "./SearchBar.css";

function Search() {

  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector(state => state.products)

  function handleInputChange(e) {
    //setea el name con lo que va escribiendo el usuario
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    let findProduct = products.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
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
    setName(""); //vacia el input
  }

  return (
    <div className="searchContainer">
      <input
        className="searchBar"
        type="text"
        placeholder="Search by name"
        onChange={(e) => handleInputChange(e)}
        value={name}
      />
      <button className="btnSearch" onClick={(e) => handleSearch(e)}>
        Buscar
      </button>
    </div>
  );
}

export default Search;
