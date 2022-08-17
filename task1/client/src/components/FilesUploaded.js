import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';
import UserService from '../services/user.service';

function FilesUploaded({ files }) {
  return (
    <Box >
      <Typography component="h2" variant="h5" sx={{ mt: 3 }}>
        Files Uploaded
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Original Name</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map(file => (
              <TableRow
                key={file.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {file.name}
                </TableCell>
                <TableCell align="right">{file.size}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.originalName + file.extension}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<DownloadIcon />}
                    onClick={() => UserService.downloadFile(file)}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default FilesUploaded;
