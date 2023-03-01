import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const PaymentError = () => {
  const history = useHistory();

  useEffect(() => {
    // mostrar la alerta Swal cuando se monta el componente
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      text:
        'No se pudo procesar la orden, intenta nuevamente, si ocurre algun problema contactanos',
      confirmButtonText: 'Ir a inicio',
    }).then((result) => {
      if (result.isConfirmed) {
        // redirigir al usuario a la página de inicio cuando se hace clic en el botón "Ir a inicio"
        history.push('/');
      }
    });
  }, [history]);

  return <div></div>;
};

export default PaymentError;
