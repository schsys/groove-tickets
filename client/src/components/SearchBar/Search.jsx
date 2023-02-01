import React, { useEffect, useState } from 'react'
import './SearchBar.css'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions";

function Search() {
  const getData=()=>{
    fetch('fakeData.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        //console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])

  const [data, setData] = useState([]);
  const [name, setName] = useState("")
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((state)=> state.products); //estado global con todos los Pokes
  
  function handleInputChange(e) { //setea el name con lo que va escribiendo el usuario
    e.preventDefault();
    setName(e.target.value)
    console.log('search', e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log('products en search', products)
    let findProduct = data.find((p) => p.name.toLowerCase() === name.toLowerCase()) //busca el nombre dentro de la array de data
    console.log('findProduct en search', findProduct)
    if(!name){
      alert('Please, enter some name');
    }
    if(findProduct){
      dispatch(actions.search(name)); //si lo encuentra se dispara la accion
      history.push(`/products/${findProduct.id}`); //despues redirige para ver el poke
    } else if(!findProduct){
      alert('That Product doesnt exist')
    }
    setName(''); //vacia el input
  }

  return (
    <div className="searchContainer">
      <input 
        className="searchBar"
        type='text' 
        placeholder= "Search by name"
        onChange={(e) => handleInputChange(e)} 
        value={name} 
      />
      <button className="btnSearch" onClick={(e) => handleSearch(e)}>Buscar</button>
    </div>
     
  )
}

export default Search;