import { useState } from 'react';
import { 
  getFileName, 
  getFileExtension, 
  getFileSizeString,
  getFileType
} from '../utils';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import UserService from '../services/user.service';

function FileSelection({ refreshUploads }) {
  const [files, setFiles] = useState([]);
  const [editedNames, setEditedNames] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [errMessages, setErrMessages] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  async function uploadFiles() {
    if (validateFiles() === false) return;

    const formData = new FormData();
    const originalNames = [];
    const sizes = [];
    const types = [];
    formData.append('editedNames', JSON.stringify(editedNames));
    formData.append('extensions', JSON.stringify(extensions));
    formData.append('numberOfFiles', files.length);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
      originalNames[i] = getFileName(files[i]);
      sizes[i] = getFileSizeString(files[i]);
      types[i] = getFileType(files[i]);
    }
    formData.append('originalNames', JSON.stringify(originalNames));
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('types', JSON.stringify(types));

    try {
      const { data } = await UserService.uploadFiles(formData);
      setFiles([]);
      setEditedNames([]);
      setExtensions([]);
      setErrMessages([]);
      setUploadError('');
      setUploadSuccess(data.message);
      refreshUploads();
    } catch(err) {
      console.log(err);
    }
  }

  function handleFileSelection(files) {
    const minSize = 1024;               // 1KB
    const maxSize = 10 * 1024 * 1024;   // 10MB

    if (files.length === 0) {
      setEditedNames([]);
      setExtensions([]);
      setErrMessages([]);
    } else {
      const editedNames = [];
      const extensions = [];
      const errMessages = [];
      for (let i = 0; i < files.length; i++) {
        editedNames[i] = getFileName(files[i]);
        extensions[i] = getFileExtension(files[i]);
        errMessages[i] = (files[i].size < minSize || files[i].size > maxSize)
          ? "File size must be between 1KB to 10MB"
          : "";
      }
      setEditedNames(editedNames);
      setExtensions(extensions);
      setErrMessages(errMessages);
    }
    setUploadError("");
    setUploadSuccess("");
    setFiles(files);
  }

  function handleNameEdit(i, name) {
    const names = editedNames.slice();
    names[i] = name;
    setEditedNames(names);
  }

  function validateFiles() {
    let isValid;
    let uploadError;
    if (files.length === 0) {
      isValid = false;
      uploadError = "Please choose files to upload!";
    } else {
      isValid = !errMessages.some(err => err !== "");
      uploadError = isValid ? "" : "Please correct the errors before upload!";
    }
    setUploadError(uploadError);
    return isValid;
  }

  function renderFiles() {
    const fileRows = [];
    for (let i = 0; i < files.length; i++) {
      fileRows.push(
        <TableRow
          key={files[i].name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{files[i].name}</TableCell>
          <TableCell sx={{ color: 'red' }}>
            {errMessages[i]}
            </TableCell>
          <TableCell>
            <TextField
              value={editedNames[i]}
              variant="outlined" 
              size="small"
              onChange={e => handleNameEdit(i, e.target.value)}
              InputProps={{
                endAdornment: 
                  <InputAdornment position="end">
                    {extensions[i]}
                  </InputAdornment>
              }}
            />
          </TableCell>
        </TableRow>
      );
    }
    return fileRows;
  }

  return (
    <div>
      <Button 
        variant="contained" 
        component="label" 
        startIcon={<FolderIcon />}
        sx={{ mr: 3, mb: 1 }}
      >
        Choose Files
        <input 
          type="file"
          name="files" 
          accept=".html,.css,.js"
          onChange={e => handleFileSelection(e.target.files)}
          multiple
          hidden
        />
      </Button>
      <Button 
        color="secondary"
        variant="contained" 
        component="label" 
        startIcon={<CloudUploadIcon />}
        sx={{ mr: 3, mb: 1 }}
      >
        Upload
        <input type="submit" hidden onClick={uploadFiles}/>
      </Button>
      <Alert 
        variant="outlined" 
        severity="error"
        sx={{ display: uploadError.length ? 'flex' : 'none' }}
      >
        {uploadError}
      </Alert>
      <Alert 
        variant="outlined" 
        severity="success"
        sx={{ display: uploadSuccess.length ? 'flex' : 'none' }}
      >
        {uploadSuccess}
      </Alert>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell>Upload File As...</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderFiles()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FileSelection;