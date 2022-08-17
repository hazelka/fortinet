// Return file name without extension
export function getFileName(file) {
  const arr = file.name.split(".");
  if (arr[arr.length - 1] === "html" 
      || arr[arr.length - 1] === "htm" 
      || arr[arr.length - 1] === "css" 
      || arr[arr.length - 1] === "js") {
    arr.pop();
  }
  return arr.join("");
}

export function getFileExtension(file) {
  let extension;
  switch (file.type) {
    case "text/javascript":
      extension = ".js";
      break;
    case "text/html":
      extension = ".html";
      break;
    case "text/css":
      extension = ".css";
      break;
    default:
      extension = "";
      break;
  }
  return extension;
}

export function getFileSizeString(file) {
  const MB = 1024 * 1024;
  const KB = 1024;
  let sizeString = "";
  if (file.size >= MB) {
    sizeString = Math.round(file.size / MB) + "MB"; 
  } else {
    sizeString = Math.round(file.size / KB) + "KB";
  }
  return sizeString;
}

export function getFileType(file) {
  let type;
  switch (file.type) {
    case "text/javascript":
      type = "JavaScript";
      break;
    case "text/html":
      type = "HTML Document";
      break;
    case "text/css":
      type = "CSS";
      break;
    default:
      type = "";
      break;
  }
  return type;
}
