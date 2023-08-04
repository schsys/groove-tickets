import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const PaymentComplete = () => {
  const history = useHistory();

  useEffect(() => {
    // mostrar la alerta Swal cuando se monta el componente
    Swal.fire({
      title: "¡Compra exitosa!",
      text: "Gracias por tu compra, puedes ver tu pedido en Mi Cuenta",
      icon: "success",
      confirmButtonText: "Ir a inicio",
    }).then((result) => {
      if (result.isConfirmed) {
        // redirigir al usuario a la página de inicio cuando se hace clic en el botón "Ir a inicio"
        history.push("/");
      }
    });
  }, [history]);

  return <div></div>;
};

export default PaymentComplete;
