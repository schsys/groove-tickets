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
        'Mientras pagabas tu orden, nos hemos quedado sin entradas. En unos momentos te devolveremos el dinero.',
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
