import { Redirect } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

export const PrivateRoute = ({children}) => {
  const { user, isLoading } = UserAuth();

  if (isLoading) return <h2>Loading...</h2>;
  
  if (!user) return <Redirect to='/register' />
  
  return <>{children}</>;
};
