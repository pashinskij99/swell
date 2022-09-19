import sendEmail from '../../../lib/mail';

export default async function handler (req, res) {
  const body = JSON.parse(req.body);

  const message = {
    to: `pashinskij99@icloud.com`,
    subject: `Письмо с сайта SWELL от ${body.name}`,
    text: `
      Name: ${body.name}\r\n
      Email: ${body.email}\r\n
      Message: ${body.message}
    `
  }
  await sendEmail(message)
  console.log(message);
  res.send(`Thanks ${req.body.name}`)
};