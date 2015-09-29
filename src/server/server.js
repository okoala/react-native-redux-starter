import path from 'path'
import express from 'express'
import compress from 'compression'
import mongoose from 'mongoose'

import { graphql } from 'graphql'
import bodyParser from 'body-parser'

const middleware = ['csrf', 'combo', 'router', 'proxy', 'static', 'error']

const app = express()
const PORT = 3000;

mongoose.connect('mongodb://localhost/graphql')

// lazy load middlewares
middleware.forEach(m => {
    middleware.__defineGetter__(m, () => require('./middleware/' + m))
})

process.on('uncaughtException', function (err) {
    (app.get('logger') || console).error('Uncaught exception:\n', err.stack)
})

app.use(compress())
app.use(bodyParser())
app.use(express.static(path.join(process.cwd(), 'dist')))
app.use(middleware.error())

const server = app.listen(PORT, () => {
  const host = server.address().address
  const port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port)
})

/********************************************/
/*                   API                    */
/********************************************/

import { index, graph } from './controllers'

app.get('/', index)
app.post('/graphql', graph)

