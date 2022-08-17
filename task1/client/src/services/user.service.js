import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/";

const getUploadedFiles = () => {
  return axios.get(API_URL + "files", { headers: authHeader() });
};

const downloadFile = async(file) => {
  try {
    const {id, originalName, editedName, extension} = file;
    const { data } = await axios.get(API_URL + `download/${id}`, {
      responseType: 'blob',
      headers: authHeader()
    });

    // Create downloadable file from blob data received
    const blob = new Blob([data]);
    const now = new Date();
    const formattedDate = now.toJSON().slice(0, 10).split("-").join("");
    const filename = 
      `${originalName}_${editedName}_${formattedDate}${extension}`;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();

  } catch(err) {
    console.log(err);
  }
};

const uploadFiles = (data) => {
  return axios.post(API_URL + 'upload', data, { 
    headers: authHeader()
  });
}

const UserService = {
  getUploadedFiles,
  downloadFile,
  uploadFiles
};

export default UserService;