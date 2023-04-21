const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: '11357cdda76581',
    pass: '2b099a33234041'
  }
});

app.post('/api/send-email-newletter', async (req, res) => {
  const { nom, prenom, adresse, date_naissance, email } = req.body;

  const mailOptions = {
    from: 'no_reply@kinepoloin.fr',
    to: email,
    subject: 'Inscription réussie',
    text: `Merci de vous être inscrit. Voici les informations que vous avez fournies :\n
    Nom: ${nom}\n
    Prénom: ${prenom}\n
    Adresse: ${adresse}\n
    Date de naissance: ${date_naissance}\n
    Adresse e-mail: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
