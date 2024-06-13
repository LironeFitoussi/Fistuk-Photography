import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="contained" color="success" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;