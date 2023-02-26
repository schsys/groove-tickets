// import { async } from "@firebase/util";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
/* import { UserAuth } from "../../context/AuthContext"; */
import axios from "axios";
import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";
import "./CompleteRegister.css";
const apiUrl = process.env.REACT_APP_BASE_URL;

//FUNCION VALIDADORA
function validate(input) {
  //va a recibir el estado input con los cambios detectados por los handlers
  let errors = {}; //objeto que guarda todos los errores y le agrego props con los nombres iguales a los del input
  if (!input.displayName) {
    //si imput no tiene una prop displayName
    errors.displayName = "Necesitás ingresar un nombre"; //al obj errors le agrego una prop displayName q tiene un mensaje como valor
  } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.displayName)) {
    //regex solo acepta letras
    errors.displayName = "Solo se permiten letras";
  } else if (input.displayName.length < 2) {
    errors.displayName = "El nombre debe tener al menos 2 letras";
  } else if (!input.lastname) {
    errors.lastname = "Necesitás ingresar un apellido";
  } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.lastname)) {
    errors.lastname = "Solo se permiten letras";
  } else if (input.lastname.length < 2) {
    errors.lastname = "El apellido debe tener al menos 2 letras";
  } else if (!input.dni) {
    errors.dni = "Necesitás ingresar tu dni.";
  } else if (!/^\d{8}$/.test(input.dni)){
    errors.dni = "Tiene que ser un dni válido, solo numeros y de 8 caracteres.";
  }else if (!input.phoneNumber) {
    errors.phoneNumber = "Necesitás ingresar un teléfono";
  } else if (!/^(?:(?:\+|00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(input.phoneNumber)){
    errors.phoneNumber = "Tiene que ser un número válido. Por ejemplo +5491133333333 o 3515555555";
  }
  return errors; //se retorna el obj errors con la prop y el string correspondiente. ej: let errors ={name: 'a name is required'}
}

export default function CompleteRegister() {
  const history = useHistory();
  /*   const { createUser } = UserAuth(); */
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({ e: "" });
  const [input, setInput] = useState({
    displayName: "",
    lastname: "",
    email: history.location.state.dbUser.userName,
    phoneNumber: 0,
    dni:0,
    //terms: false,
  });

  //Alert para saludar cuando se desloguea
  const EmailUsed = () => {
    Swal.fire({
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "Email usado.",
      title: "Yazz",
      html: "<h3>Ese email ya está registrado</p>",
      footer: "<p>Probá con otro email.</p>",
    });
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChangeCheck = () => {
    setChecked(!checked);
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      await axios.post(
        `${apiUrl}/customer`, // eslint-disable-next-line
        {
          userId: history.location.state.dbUser.id,
          name: input.displayName + " " + input.lastname,
          email: input.email,
          telephone: input.phoneNumber,
          document: input.dni,
        }
      );
      setInput({
        //resetea el estado del input
        displayName: "",
        lastname: "",
        email: "",
        phoneNumber: 0,
        dni:0,
        //terms: false,
      });
      setChecked(false);
      history.push("/"); //despues redirige para ver todos los shows
    } catch (errors) {
      switch (errors.code) {
        case "auth/email-already-in-use":
          setErrors("El mail ya está registrado. Necesitás usar otro mail.");
          EmailUsed();
          break;
        default:
          setErrors(errors.message);
      }
      console.log(errors.message);
    }
  };

  return (
    <div className="register_page_container">
      <div className="register_section">
        {/*SECTION TO REGISTER*/}
        <div className="register_container">
          <h2 className="register_h2">YA ESTAS CERCA, FINALIZA TU REGISTRO</h2>
          {/* <p className="signup_text">Registrate!</p> */}
          <form
            onSubmit={(e) => handleSubmitSignup(e)}
            className="register_form"
          >
            <div className="register_info_wraper">
              <label className="register-form_label" htmlFor="name">
                Nombre:
              </label>
              <input
                className="signup_section_input"
                type="text"
                id="name"
                name="displayName"
                value={input.displayName}
                placeholder="Ingresá tu nombre"
                onChange={(e) => handleChange(e)}
              />
              {errors.displayName && (
                <p className="signup_error">{errors.displayName}</p>
              )}{" "}
              {/*si el estado errors tiene la prop name, renderizo un parrafo con el string de esta prop */}
            </div>
            <div className="register_info_wraper">
              <label className="register-form_label" htmlFor="lastname">
                Apellido:
              </label>
              <input
                className="signup_section_input"
                type="text"
                id="lastname"
                name="lastname"
                value={input.lastname}
                placeholder="Ingresá tu apellido"
                onChange={(e) => handleChange(e)}
              />
              {errors.lastname && (
                <p className="signup_error">{errors.lastname}</p>
              )}
            </div>
            <div className="register_info_wraper">
              <label className="register-form_label" htmlFor="email">
                Email:
              </label>
              <input
                className="signup_section_input"
                type="email"
                id="email"
                name="email"
                value={input.email}
                disabled
              />
              {errors.email && <p className="signup_error">{errors.email}</p>}
            </div>
            <div className="register_info_wraper">
              <label className="register-form_label" htmlFor="dni">
                Dni:
              </label>
              <input
                className="signup_section_input"
                type="dni"
                id="dni"
                name="dni"
                value={input.dni}
                onChange={(e) => handleChange(e)}
              />
              {errors.dni && <p className="signup_error">{errors.dni}</p>}
            </div>
            <div className="register_info_wraper">
              <label className="register-form_label" htmlFor="phoneNumber">
                Teléfono:
              </label>
              <input
                className="signup_section_input"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                placeholder="Ingresá tu teléfono"
                onChange={(e) => handleChange(e)}
              />
              {errors.phoneNumber && (
                <p className="signup_error">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="register_info_wraper_check">
              <label className="register-label_check" htmlFor="terms">
                <Link to={"./terms"} className="register_link_terms">
                  Aceptás los términos y condiciones:
                </Link>
              </label>
              <input
                className="register-input_check"
                type="checkbox"
                id="checked"
                name="checked"
                value={checked}
                onChange={(e) => handleChangeCheck(e)}
              />
            </div>
            <div className="register_btn_div">
              {Object.keys(errors).length || checked === false ? (
                <button
                  className="register_btn_notSubmit"
                  type="submit"
                  disabled
                >
                  Completá el formulario
                </button>
              ) : (
                <button className="register_btn_submit" type="submit">
                  FINALIZAR
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
