const express = require('express')
const cookieParser = require('cookie-parser')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

const USERS = { alice: 'password', bob: '12345' }
const BALANCES = { alice: 500, bob: 700 }

// const SESSIONS = {}

app.get(`/`, (req, res) => {
	// const sessionId = req.cookies.sessionId
	const username = req.cookies.username
	if (username) {
		res.send(`Hi ${username}, U have $${BALANCES[username]}!!`)
	} else {
		createReadStream('index.html').pipe(res)
	}
})

app.post('/login', (req, res) => {
	const username = req.body.username
	const password = USERS[username]

	if (password === req.body.password) {
		res.cookie('username', username)
		res.redirect('/')
	} else {
		res.send('fail!')
	}
})

app.use(cookieParser())


app.listen(4000)
