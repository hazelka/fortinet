import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import LoginForm from "../components/LoginForm";

import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

function Signup() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e, username, password) => {
    e.preventDefault();
    setMessage("");

    AuthService.signup(username, password).then(
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
      <Grid item>
        <Link href="/login" variant="body2">
          {"Already have an account? Log in"}
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
      type="Sign Up" 
      customField={customField} 
      handleSubmit={handleSignup}
    />
  );
}

export default Signup;