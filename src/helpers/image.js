const multer = require('multer');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { NotFoundError } = require('../helpers/errors/NotFoundError');
const { isEmpty } = require('../helpers/util');
const { databaseURL } = require('../config');

const conn = mongoose.createConnection(databaseURL);


const handleFileName = (req, file) => new Promise((resolve, reject) => {
  crypto.randomBytes(16, (err,) => {
    if (err) {
      return reject(err);
    }
    console.log(file);
    const filename = file.originalname;
    const fileInfo = {
      filename,
      bucketName: 'uploads',
    };
    return resolve(fileInfo);
  });
});

const storage = new GridFsStorage({
  url: databaseURL,
  file: handleFileName,
});
const upload = multer({ storage });
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
const getImage = async (idImage) => {
  let readstream;

  const id = mongoose.Types.ObjectId(idImage);
  try {
    const file = await gfs.files.find({ _id: id });
    if (isEmpty(file)) {
      return undefined;
    }
    readstream = gfs.createReadStream({ _id: id });
    return readstream;
  } catch (error) {
    throw new NotFoundError('Not found image', { _id: idImage });
  }
};

module.exports = { upload, getImage };
