const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuid4 } = require('uuid');

const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads/'),
      filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
            cb(null, uniqueName);
      }
});

const upload = multer({
      storage: storage, 
      limit: {
             fileSize: 1000000 * 100
      }
}).single('myfile');
// ye single ke bad ka thoda dhyan dena

router.post('/', (req, res) => {
      upload(req, res, async (err) => {
            if(!req.file) {
                  return res.json({ error: "File Not Found."});
            }
            if(err) {
                  res.status(500).send({error : err });
            } else {
                  // console.log(req.file);
                  const file = new File({
                        filename: req.file.filename,
                        uuid: uuid4(),
                        path: req.file.path,
                        size: req.file.size
                  }); 
                  const response = await file.save();
                  return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
            }

      });
});

router.post('/send', async (req, res) => {
      // frontend se uuid, emailFrom, emailTo ane wala h 
      const { uuid, emailTo, emailFrom } = req.body;
      console.log(req.body);
      // emailFrom = "ShubhChintak@gmail.com";
      if(!uuid || !emailTo || !emailFrom) {
            return res.status(422).send({error: "All fields required! "});
      }
      const file = await File.findOne({uuid});
      // email firse bhejna check nahi kiya
      file.sender = emailFrom;
      file.receiver = emailTo;
      const response = await filesave();

      const sendMail = require('../services/emailService')
      sendMail({
            from: emailFrom, 
            to: emailTo,
            subject: 'tanShare',
            text: `${emailFrom} shared file with you.`,
            html: require('../services/emailTemplate')({
                  emailFrom: emailFrom, 
                  downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
                  size: parseInt(file.size / 1024) + ' KB', 
                  expires: '24 hours'
            }) 
      });
      return res.send({ 'success': true });
});

module.exports = router;