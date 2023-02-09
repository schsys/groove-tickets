import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from "firebase/auth";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Login.css";
import GoogleLogo from "./googleLogo.png";

export default function Login() {
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

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();
  //track the authentication status
  const [authorizedUser, setAuthorizedUser] = useState(
    false || sessionStorage.getItem("accessToken")
  );

  function signInwithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user) {
          user.getIdToken().then((tkn) => {
            // set access token in session storage
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);
          });
        }
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

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

  function logoutUser() {
    signOut(auth)
      .then(() => {
        // clear session storage
        sessionStorage.clear();
        setAuthorizedUser(false);
        // window.location.replace("/");
        alert("Logged Out Successfully");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }

  return (
    <div className="login_section">
      {/*SECTION TO LOGIN*/}
      <div className="login_container">
        {authorizedUser ? (
          <>
            <h3>Ya estás logueado</h3>
            <p>¿Querés cerrar sesión?</p>
            <button onClick={logoutUser}>CERRAR SESIÓN</button>
          </>
        ) : (
          <div className="login_container">
            <h2 className="login_h2">INGRESÁ</h2>
            <form
              action="POST"
              onSubmit={(e) => handleSubmitLogin(e)}
              className="login_form"
            >
              <div className="login_info_wraper">
                <label className="login-form_label" htmlFor="email">
                  email:
                </label>
                <input
                  className="login_section_input"
                  type="email"
                  //id="email"
                  name="email"
                  value={input.email}
                  placeholder="Ingresá tu email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="login_info_wraper">
                <label className="login-form_label" htmlFor="password">
                  Contraseña:
                </label>
                <input
                  className="login_section_input"
                  type="password"
                  // id="password"
                  name="password"
                  value={input.password}
                  placeholder="Ingresá tu contraseña"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="login_btn_div">
                <button className="login_btn_submit" type="submit">
                  INGRESÁ
                </button>
              </div>
            </form>
            <Link to="/" className="link_recover_password">
              ¿Olvidaste tu contraseña?
            </Link>
            <div className="login_with_google">
              <h3>O ingresá con tu cuenta de Google</h3>
              <button className="login_btn_google" onClick={signInwithGoogle}>
                <img
                  className="login_with_google_logo"
                  src={GoogleLogo}
                  alt="logo de google"
                />
                <h4 className="login_btn_text">Ingresá</h4>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
