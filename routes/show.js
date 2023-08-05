const express = require('express');
const router = express.Router();
const File = require('../models/file')

router.get('/:uuid', async (req, res) => {
      try {
            const file = await File.findOne({ uuid: req.params.uuid });
            if(!file) {
                  res.render('downlaod', {error: 'File Not Found!'});
            }
            return res.render('download', {
                  uuid: file.uuid,
                  filename: file.filename,
                  filesize: file.size,
                  // download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
                  download: `/files/download/${file.uuid}`
            }); 
            // res.send(`${process.env.APP_BASE_URL}/files/download/${file.uuid}`);
      } catch (err) {
            res.render('download', {error : err});
      }
});

module.exports = router;