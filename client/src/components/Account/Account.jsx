import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";
import { getDetailedUser } from '../../common/integrations/api';
import AdminApp from "../../admin";
import UserApp from "../../miCuenta";
import Loader from "../Loader/Loader";
import "./Account.css";

export default function Account() {
  const { user, logout } = UserAuth();
  // console.log('Account, logged user: ', user);
  const history = useHistory();

  const [apiUser, setApiUser] = useState({
    item: {},
    fetchStatus: 'loading',
    error: null
  });

  useEffect(() => {
    console.log('Account useEffect()');

    async function getApiUser(username) {
      const response = await getDetailedUser(username);

      setApiUser(response);
    }

    getApiUser(user.email)

  }, [user]);

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

  const handleLogout = async () => {
    try {
      await logout();
      LogoutMessage();
      history.push("/"); //despues redirige para ver todo
    } catch (e) {
      console.log(e.message);
    }
  };

  if (apiUser.fetchStatus === 'loading') {
    return <>
      <Loader />
    </>
  }

  if (apiUser.fetchStatus === 'failed') {
    return <>
      <p>Oops! Esto es embarazoso! </p>
      <p>{apiUser.error && apiUser.error.message}</p>
      <NavLink to="/">Volver</NavLink>
    </>
  }

  if (apiUser.item.role === 'Admin') {
    return <AdminApp />;
  }
  if (apiUser.item.role === 'User') {
    return <UserApp />;
  }

  // return <UserApp />;

  return (
    <div className="account_page_container">
      <div className="account_wrapper">
        <h1 className="account_title">Bienvenido a tu cuenta</h1>
        <div className="account_info_div">
          <b className="account_info_bold">Nombre:</b>
          <p className="account_info_text">{user?.displayName}</p>
        </div>
        <div className="account_info_div">
          <p className="account_info_text">Soy {apiUser.item.role}</p>
        </div>
        <div className="account_info_div">
          <b className="account_info_bold">email:</b>
          <p className="account_info_text">{user?.email}</p>
        </div>
        <div className="account_info_div">
          <b className="account_info_bold">teléfono:</b>
          <p className="account_info_text">{apiUser?.item?.telephone}</p>
        </div>
        <div>
          <h4 className="account_logout_ask">¿Querés cerrar sesión?</h4>
          <button className="login_logged_btn" onClick={handleLogout}>
            CERRAR SESIÓN
          </button>
        </div>
      </div>
    </div>
  );
}
