const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user : 'pashinskij99@gmail.com',
		pass : 'jckieesccwmsfelh'
	}
},{
	from: 'pashinskij99@gmail.com',
})

const sendEmail = (message) => {
	smtpTransport.sendMail(message, (err, info) => {
		if(err) return console.log(err)
		console.log('Email sent: ', info);
	})
}

module.exports = sendEmail