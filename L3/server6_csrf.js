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

const SESSIONS = {}

app.get(`/`, (req, res) => {
	const sessionId = req.cookies.sessionId
	const username = SESSIONS[sessionId]

	if (username) {
		res.send(`Hi ${username}, U have $${BALANCES[username]}.
			<form method='POST' action='http://localhost:4000/transfer'>
			  いくら送るや？
			  <input name='amount' />
			  誰へ？
			  <input name='to' />
			  <input type='submit' value='送金する' />
			</form>
			`)
	} else {
		createReadStream('index.html').pipe(res)
	}
})

app.post('/login', (req, res) => {
	const username = req.body.username
	const password = USERS[username]

	if (req.body.password === password) {
		const sessionId = randomBytes(16).toString('hex')
		SESSIONS[sessionId] = username
		res.cookie('sessionId', sessionId)
		res.redirect('/')
	} else {
		res.send('fail!')
	}
})

app.post('/transfer', (req, res) => {
	const sessionId = req.cookies.sessionId
	const username = SESSIONS[sessionId]

	if (!username) {
		res.send('fail!')
		return
	}

	const amount = Number(req.body.amount)
	const to = req.body.to

	BALANCES[username] -= amount
	BALANCES[to] += amount

	res.redirect('/')
})

app.get('/logout', (req, res) => {
	const sessionId = req.cookies.sessionId
	delete SESSIONS[sessionId]
	res.clearCookie('sessionId')
	res.redirect('/')
})

app.use(cookieParser())


app.listen(4000)
