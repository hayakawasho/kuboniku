const express = require('express')
const helmet = require('helmet')
const basicAuth = require('basic-auth-connect')

const USER_NAME = process.env.USER_NAME || 'admin'
const PASSWORD = process.env.PASSWORD || 'admin'

const app = express()

app.use(helmet())
app.use(basicAuth(USER_NAME, PASSWORD))
app.use(express.static('public'))

module.exports = app

