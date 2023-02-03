import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import GoogleLogo from "./googleLogo.png";

export default function Register() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
    phone: 0,
    terms: false,
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    /*setErrors(validate({
          ...input,
          [e.target.name]: e.target.value,
        }))*/
  };

  const handleChangeCheck = () => {
    setChecked(!checked);
  };

  function handleSelect(e) {
    //para los types necesito una func aparte
    //recibe el type que se seleccionó en el selector
    if (!input.types.includes(e.target.value)) {
      //evita que se repitan los tipos
      setInput({
        ...input,
        types: [...input.types, e.target.value], //al array de la prop types le añade el nuevo tipo que se seleccionó
      });
    }
    /* setErrors(validate({
          ...input,
                types: [...input.types, e.target.value]
        }))*/
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    console.log("form register submited");
    setInput({
      //resetea el estado del input
      name: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
      phone: 0,
      terms: false,
    });
    history.push("/"); //despues redirige para ver todos los shows
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log("form login submited");
    setInput({
      //resetea el estado del input
      email: "",
      password: "",
    });
    history.push("/"); //despues redirige para ver todo
  };

  return (
    <div className="register_section">
      {/*SECTION TO REGISTER*/}
      <div className="register_container">
        <h2 className="register_h2">¿TODAVÍA NO SOS USUARIO?</h2>
        <form
          action="POST"
          onSubmit={(e) => handleSubmitRegister(e)}
          className="register_form"
        >
          <div className="register_info_wraper">
            <label className="register-form_label" htmlFor="name">
              Nombre:
            </label>
            <input
              className="register_section_input"
              type="text"
              id="name"
              name="name"
              value={input.name}
              placeholder="Ingresá tu nombre"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="register_info_wraper">
            <label className="register-form_label" htmlFor="lastname">
              Apellido:
            </label>
            <input
              className="register_section_input"
              type="text"
              id="lastname"
              name="lastname"
              value={input.lastname}
              placeholder="Ingresá tu apellido"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="register_info_wraper">
            <label className="register-form_label" htmlFor="email">
              email:
            </label>
            <input
              className="register_section_input"
              type="email"
              id="email"
              name="email"
              value={input.email}
              placeholder="Ingresá tu email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="register_info_wraper">
            <label className="register-form_label" htmlFor="phone">
              Teléfono:
            </label>
            <input
              className="register_section_input"
              type="tel"
              id="phone"
              name="phone"
              value={input.phone}
              placeholder="Ingresá tu teléfono"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="register_info_wraper">
            <label className="register-form_label" htmlFor="password">
              Contraseña:
            </label>
            <input
              className="register_section_input"
              type="password"
              id="password"
              name="password"
              value={input.password}
              placeholder="Elegí una contaseña"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="register_info_wraper">
            <label className="register-form_label" htmlFor="repassword">
              Contraseña:
            </label>
            <input
              className="register_section_input"
              type="password"
              id="repassword"
              name="repassword"
              value={input.repassword}
              placeholder="Volvé a ingresar tu contraseña"
              onChange={(e) => handleChange(e)}
            />
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
              id="terms"
              name="terms"
              value={input.terms}
              onChange={(e) => handleChangeCheck(e)}
            />
          </div>

          <div className="register_btn_div">
            <button className="register_btn_submit" type="submit">
              REGISTRATE
            </button>
          </div>
        </form>
      </div>

      <div className="sections_separation_div"></div>

      {/*SECTION TO LOGIN*/}
      <div className="login_container">
        <h2 className="register_h2">INGRESÁ</h2>
        <form
          action="POST"
          onSubmit={(e) => handleSubmitLogin(e)}
          className="login_form"
        >
          <div className="register_info_wraper">
            <label className="register-form_label" htmlFor="email">
              email:
            </label>
            <input
              className="register_section_input"
              type="email"
              id="email"
              name="email"
              value={input.email}
              placeholder="Ingresá tu email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="register_info_wraper">
            <label className="register-form_label" htmlFor="password">
              Contraseña:
            </label>
            <input
              className="register_section_input"
              type="password"
              id="password"
              name="password"
              value={input.password}
              placeholder="Ingresá tu contraseña"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="register_btn_div">
            <button className="register_btn_submit" type="submit">
              INGRESÁ
            </button>
          </div>
        </form>
        <Link className="link_recover_password">¿Olvidaste tu contraseña?</Link>
        <div className="login_with_google">
          <h3>O ingresá con tu cuenta de Google</h3>
          <Link>
            <img
              className="login_with_google_logo"
              src={GoogleLogo}
              alt="logo de google"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
