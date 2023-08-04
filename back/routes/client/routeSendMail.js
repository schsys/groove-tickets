const express = require('express');
const mailer = require('../../mailer')
const router = express.Router();

router.post('/', async (req, res) => {
  const { to, subject, body } = req.body;
  console.log('Received request to /mailer');
  try {
    await mailer(to, subject, body);
    res.status(200).send("Mail Sent Sucessfully");
  } catch (error) {
    console.error(error);
    res.status(404).send('Error sending email');
  }
});

module.exports = router;
