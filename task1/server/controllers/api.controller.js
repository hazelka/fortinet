const db = require('../db');
const path = require('path');

exports.getFiles = (req, res) => {
  const sql = `SELECT * FROM files WHERE userId = "${req.userId}"`;

  db.all(sql, (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Server error"});
    }

    const files = [];
    for (let i = 0; i < row.length; i++) {
      const file = {};
      const { id, originalName, editedName, extension, size, type} = row[i];
      file.id = id;
      file.name = editedName + extension;
      file.originalName = originalName;
      file.editedName = editedName;
      file.extension = extension;
      file.size = size;
      file.type = type;
      files.push(file);
    }
    res.json(JSON.stringify(files));
  });
};

exports.download = (req, res) => {
  const sql = `SELECT * FROM files WHERE id = "${req.params.fileId}"`;

  db.get(sql, (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Server error"});
    }

    if (row.userId !== req.userId) {
      return res.status(401).send({
        message: "Access to the file is unauthorized"
      });
    }

    const downloadPath = path.join(__dirname, "..", row.path);
    res.download(downloadPath, downloadName);
  });
};

exports.upload = (req, res) => {
  const sql = "INSERT INTO " + 
    "files(userId, originalName, editedName, extension, size, type, path) " +
    "VALUES(?, ?, ?, ?, ?, ? ,?)";
    
  const userId = req.userId;
  const originalNames = JSON.parse(req.body.originalNames);
  const editedNames = JSON.parse(req.body.editedNames);
  const extensions = JSON.parse(req.body.extensions);
  const sizes = JSON.parse(req.body.sizes);
  const types = JSON.parse(req.body.types);
  const numberOfFiles = req.body.numberOfFiles;

  for (let i = 0; i < numberOfFiles; i++) {
    const params = [
      userId, 
      originalNames[i], 
      editedNames[i], 
      extensions[i],
      sizes[i],
      types[i], 
      req.files[i].path
    ];
    db.run(sql, params, (err) => {
      if (err) {
        return res.status(400).json({
          message: 'Unable to upload files'
        });
      }
    });
  }
  res.json({
    message: `Successfully uploaded ${numberOfFiles} files!`
  });
}