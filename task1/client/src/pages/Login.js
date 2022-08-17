import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import LoginForm from "../components/LoginForm";

import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';



function Login() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e, username, password) => {
    e.preventDefault();
    setMessage("");
    AuthService.login(username, password).then(
      () => {
        navigate("/dashboard");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  }

  const customField = (
    <Grid container>
      <Grid item xs={12}>
        <Link href="/signup" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
      <Grid 
        item 
        xs={12} 
        sx={{ 
          my: 3, 
          display: message === "" ? 'none': 'block'
        }}
      >
        <Alert severity="error">
          {message}
        </Alert>
      </Grid>
    </Grid>
  );

  return (  
    <LoginForm 
      type="Login" 
      customField={customField}
      handleSubmit={handleLogin}
    />
  );
}

export default Login;