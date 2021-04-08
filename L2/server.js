const express = require('express')
const cookieParser = require('cookie-parser')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')

const USERS = { alice: 'password', bob: '12345' }

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.get(`/`, (req, res) => {
	createReadStream('index.html').pipe(res)
})

app.post('/login', (req, res) => {
	const username = req.body.username
	const password = USERS[username]

	if (req.body.password == password) {
		res.cookie('username', username)
		res.send('nice')
	} else {
		res.send('fail!')
	}
})



app.use(cookieParser())


app.listen(4000)
