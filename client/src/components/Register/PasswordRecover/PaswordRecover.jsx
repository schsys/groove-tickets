// import React, { useState } from 'react'
// import { Modal, TextField, Button } from "@mui/material";


// export default function PaswordRecover() {
//     const [open, setOpen] = useState(false);

//     function handleOpen() {
//         setOpen(true);
//       }
      
//       function handleClose() {
//         setOpen(false);
//       }

//   return (
//     <div>


// <Modal open={handleOpenModal} onClose={handleCloseModal}>
// <div className={classes.paper}>
//   <div>
//     <button onClick={handleCloseModal}>X</button>
//   </div>
//   <h2>Recuperar contraseña</h2>
//   <p>
//     Ingresa tu correo electrónico para recibir las instrucciones
//     para recuperar tu contraseña.
//   </p>
//   <form onSubmit={handleSendEmail}>
//     <div className="login_info_wraper">
//       <label className="login-form_label" htmlFor="email">
//         email:
//       </label>
//       <input
//         className="login_section_input"
//         type="email"
//         name="email"
//         value={email}
//         placeholder="Ingresá tu email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//     </div>
//     <div className="login_btn_div">
//       <button className="login_btn_submit" type="submit">
//         RECUPERAR
//       </button>
//        {resetError && <p className="login_error_text">{resetError}</p>}
//  </div>
// </form>
// </div>
// </Modal>
//     </div>
//   )
// }


/*function logoutUser() {
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
  }*/