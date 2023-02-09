import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
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

  const handleSubmitSignup = (e) => {
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

  return (
    <div className="register_section">
      {/*SECTION TO REGISTER*/}
      <div className="register_container">
        <h2 className="register_h2">¿TODAVÍA NO SOS USUARIO?</h2>
        <p className="signup_text">Registrate!</p>
        <form
          action="POST"
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
              className="signup_section_input"
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
              className="signup_section_input"
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
              className="signup_section_input"
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
              className="signup_section_input"
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
              className="signup_section_input"
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
    </div>
  );
}
