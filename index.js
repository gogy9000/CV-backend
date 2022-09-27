const express = require("express")
const app = express();
const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD
const my_email = process.env.MYEMAIL

let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: smtp_login,
        pass: smtp_password, // здесь должен быть пароль приложения, а не  пароль аккаунта, друг...
    },
});
app.post('/sendMail', async function (req, res) {
    res.send('azaza');
    try {
        let {name, email, message} = req.body
        let info = await transporter.sendMail({
            from: 'Портфолио',
            to: my_email,
            subject: "Обратная связь ✔",
            html: `<b>Сообщение через обратную связь Портфолио</b>
            <div>Имя: ${name}</div>
            <div>e-mail: ${email}</div>
            <div>Сообщение: ${message}</div>`,
        });
        console.log(info)
    } catch (e) {
        console.log(e)
    }
});

app.listen(port, () => {
    console.log(`it's worked ${port}`)
})