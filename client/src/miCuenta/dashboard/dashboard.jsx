import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";
import { useHistory } from "react-router-dom";

export const Dashboard = () => {
  const { user, logout } = UserAuth();
  const history = useHistory();

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
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleBacktoSite = () => {
    history.push('/');
  }

  return (
    <Card sx={{ mt: 1 }}>
      <CardHeader title={`Hola ${user.displayName}!`} />
      <CardContent>
        <p>{`Iniciaste sesión como ${user.email}`}</p>
      </CardContent>
      <CardActions>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
        <Button onClick={handleBacktoSite}>Volver al sitio</Button>
      </CardActions>
    </Card>
  );
} 
