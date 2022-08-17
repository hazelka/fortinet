import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';

import FileSelection from "../components/FileSelection";
import FilesUploaded from "../components/FilesUploaded";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

function Dashboard() {
  const navigate = useNavigate();

  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    } else {
      fetchUploadedFiles();
    }
  }, []);

  async function fetchUploadedFiles() {
    try {
      const { data } = await UserService.getUploadedFiles();
      const files = JSON.parse(data);
      setUploadedFiles(files);
    } catch (error) {
      console.error(error);
    } 
  };

  return (  
    <Box sx={{ p: 3 }}>
      <CssBaseline />
      <Typography 
        sx={{ textAlign: 'right' }}
        onClick={AuthService.logout}
      >
        <Link href="/login" variant="body2">
          {"Logout to account"}
        </Link>
      </Typography>
      <Typography component="h1" variant="h2" sx={{ my: 3 }}>
        File Management
      </Typography>
      <FileSelection refreshUploads={fetchUploadedFiles} />
      <FilesUploaded files={uploadedFiles} />
    </Box>
  );
}

export default Dashboard;