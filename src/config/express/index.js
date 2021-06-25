const express = require('express')
const cors = require('cors')
const routes = require('../../routes')
const path = require('path')
require('dotenv').config()

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads')))

Object.keys(routes).forEach((key) => app.use(`/api/${key}`, routes[key]))

module.exports = app
