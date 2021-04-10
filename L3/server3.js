const express = require('express')
const cookieParser = require('cookie-parser')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')
// const { randomBytes } = require('crypto')
const COOKIE_SECRET = 'kjhdsjfhwiuerksxwio'

const app = express()
app.use(cookieParser(COOKIE_SECRET))
app.use(bodyParser.urlencoded({ extended: false }))

const USERS = { alice: 'password', bob: '12345' }
const BALANCES = { alice: 500, bob: 700 }

let nextSessionId = 1
const SESSIONS = {}

app.get('/', (req, res) => {
	// const sessionId = req.cookies.sessionId
	const sessionId = req.cookies.sessionId
	const username = SESSIONS[sessionId]
	if (username) {
		const balance = BALANCES[username]
		res.send(`Hi ${username}, U have $${balance}!!`)
	} else {
		createReadStream('index.html').pipe(res)
	}
})

app.post('/login', (req, res) => {
	const username = req.body.username
	const password = USERS[username]
	if (password === req.body.password) {
		SESSIONS[nextSessionId] = username
		res.cookie('sessionId', nextSessionId)
		nextSessionId += 1
		res.redirect('/')
	} else {
		res.send('fail!')
	}
})

app.get('/logout', (req, res) => {
	const sessionId = req.cookies.sessionId
	delete SESSIONS[sessionId]
	res.clearCookie('sessionId')
	res.redirect('/')
})

app.use(cookieParser())

app.listen(4000)
