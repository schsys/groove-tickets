import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import { Modal } from "@mui/material";
import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";
import GoogleLogo from "./googleLogo.png";
import axios from "axios";
import "./Login.css";

import { useDispatch } from "react-redux";
import { setLocalStorageToApi } from "../../redux/actions";

const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Login() {
  const { signIn } = UserAuth(); //Lo usamos para loguearse con email y passw
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //Alert para saludar cuando se desloguea
  const LogoutMessage = () => {
    Swal.fire({
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "Usuasio deslogueado.",
      title: "Yazz",
      html: "<h3>Gracias, te esperamos la próxima</p>",
      footer: "<p>Podés seguir navegando.</p>",
    });
  };

  const EmailSent = () => {
    Swal.fire({
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "Usuasio deslogueado.",
      title: "Yazz",
      html: "<h3>Ya te enviamos el mail</p>",
      footer: "<p>Revisá tu casilla.</p>",
    });
  };

  //***Login con Google
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();
  // const [isAuthorized, setIsAuthorized] = useSessionStorage("accessToken");
  //track the authentication status
  const [authorizedUser, setAuthorizedUser] = useState(
    false || sessionStorage.getItem("accessToken")
  );

  function signInwithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user) {
          user.getIdToken().then(async (tkn) => {
            // Save data in db
            try {
              const dbExistUser = await axios.get(
                `${apiUrl}/user?userName=${user.email}`
              );
              if (dbExistUser.data) {
                sessionStorage.setItem("userName", user.email);
                // set access token in session storage
                console.log(tkn);
                sessionStorage.setItem("accessToken", tkn);
                setAuthorizedUser(true);
                if (!dbExistUser.data.Customer) {
                  history.push({
                    pathname: "/complete-register",
                    state: { dbUser: dbExistUser.data },
                  });
                  /* await axios.post(`${apiUrl}/admin/customers`,
                  {
                    userId: dbExistUser.data.id,
                    name: user.displayName,
                    email: user.email,
                    telephone: '',
                    document: 123456
                  }) */
                } else {
                  history.push("/"); //despues redirige para ver todo
                }
              }
            } catch (error) {
              if (error.response.status === 404) {
                const newUser = await axios.post(`${apiUrl}/user`, {
                  userName: user.email,
                  role: "User",
                  status: "Active",
                });

                /* await axios.post(`${apiUrl}/admin/customers`,
                  {
                    userId: newUser.data.id,
                    name: user.displayName,
                    email: user.email,
                    telephone: '',
                    document: 123456
                  }) */
                sessionStorage.setItem("userName", user.email);
                // set access token in session storage
                sessionStorage.setItem("accessToken", tkn);
                setAuthorizedUser(true);
                console.log("user:", newUser);
                history.push({
                  pathname: "/complete-register",
                  state: { dbUser: newUser.data },
                });
              } else {
                console.log(error);
              }
            }
          });
          history.push("/"); //despues redirige para ver todo

          //------------------------------------------------------------------------
          // aca debo llamar a la funcion de control de localstorage contra carrito
          //
          dispatch(setLocalStorageToApi(user));
          //------------------------------------------------------------------------
        }
      })
      .catch((error) => {
        const errorLog = {
          code: error.code,
          message: error.message,
          email: error.customData.email,
          credential: GoogleAuthProvider.credentialFromError(error),
        };

        console.log(`Ha ocurrido un error con el codigo ${errorLog.code}`);
        console.log(`Ha sucedido al utilizar el email ${errorLog.email}`);
        console.log(`El error se refiere a`);
        console.log(errorLog.message);

        /* // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error); */
      });
  }

  //***desloguear Google
  function logoutUser() {
    signOut(auth)
      .then(() => {
        // clear session storage
        sessionStorage.clear();
        setAuthorizedUser(false);
        // window.location.replace("/");
        LogoutMessage();
        sessionStorage.removeItem("accessToken");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
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

  //***Login con email y password
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signIn(input.email, input.password);
      // console.log("result from signIn", result);
      sessionStorage.setItem("userName", input.email);
      // set access token in session storage
      sessionStorage.setItem("accessToken", result.user.accessToken);
      history.push("/"); //despues redirige para ver todo
      setInput({
        //resetea el estado del input
        email: "",
        password: "",
      });
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError(
            "El usuario no se encontró. Por favor, verificá el mail ingresado."
          );
          break;
        case "auth/wrong-password":
          setError("La contraseña es incorrecta.");
          break;
        default:
          setError(error.message);
      }
    }
  };

  //***Modal para reiniciar contraseña */
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setError("");
    return sendPasswordResetEmail(auth, email).then(() => {
      //setEmail(true);
      // setInput({ email: "", password: "" });
      EmailSent();
    });
  };

  return (
    <div className="login_section">
      {/*SECTION TO LOGIN*/}
      <div className="login_container">
        {authorizedUser ? (
          <div className="login_logged_div">
            <h3 className="login_logged_title">Ya estás logueado!</h3>
            <p className="login_logged_text">¿Querés cerrar sesión?</p>
            <button className="login_logged_btn" onClick={logoutUser}>
              CERRAR SESIÓN
            </button>
          </div>
        ) : (
          <>
            <h2 className="login_h2">INGRESÁ</h2>

            {/* // Loguearse con email y password */}
            <form onSubmit={(e) => handleSubmitLogin(e)} className="login_form">
              <div className="login_info_wraper">
                <label className="login-form_label" htmlFor="email">
                  Email:
                </label>
                <input
                  className="login_section_input"
                  type="email"
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
                {error && <p className="login_error_text">{error}</p>}
              </div>
            </form>
            <button className="link_recover_password" onClick={handleOpenModal}>
              ¿Olvidaste tu contraseña?
            </button>
            {/*Modal para recuperar contraseña*/}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <div className="modal-container">
                <button className="reset_btn_close" onClick={handleCloseModal}>
                  X
                </button>
                <h2 className="modal-title">Recuperar contraseña</h2>
                <p className="modal-description">
                  Ingresa tu correo electrónico para recibir las instrucciones
                  para recuperar tu contraseña.
                </p>
                <form
                  className="reset_password_form"
                  onSubmit={handleSendEmail}
                >
                  <input
                    className="reset_section_input"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Ingresá tu email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="reset_btn_div">
                    <button className="reset_btn_submit" type="submit">
                      RECUPERAR
                    </button>
                    {/* {resetError && <p className="login_error_text">{resetError}</p>} */}
                  </div>
                </form>
              </div>
            </Modal>

            {/*Loguearse con Google*/}
            <div className="login_with_google">
              <h2 className="login_h2">O ingresá con tu cuenta de Google</h2>
              <button className="login_btn_google" onClick={signInwithGoogle}>
                <img
                  className="login_with_google_logo"
                  src={GoogleLogo}
                  alt="logo de google"
                />
                <h4 className="login_btn_text">Ingresá</h4>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
