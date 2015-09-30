import path from 'path'
import express from 'express'
import compress from 'compression'
import mongoose from 'mongoose'

import { graphql } from 'graphql'
import bodyParser from 'body-parser'

/********************************************/
/*                  server                  */
/********************************************/

const middleware = ['csrf', 'static', 'error']

const app = module.exports = express()
const PORT = 3000;

mongoose.connect('mongodb://192.168.99.100:32768/graphql', (err, conn) => {
	if (err) return console.error('connect error: ', err)
	console.log('connectioned')
})

// lazy load middlewares
middleware.forEach(m => {
    middleware.__defineGetter__(m, () => require('./middleware/' + m))
})

process.on('uncaughtException', err => {
    (app.get('logger') || console).error('Uncaught exception:\n', err.stack)
})

app.set('logger', console)

app.use(compress())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.static(path.join(process.cwd(), 'dist')))
app.use(middleware.error())

if (require.main === module) {
	const server = app.listen(PORT, () => {
	  const host = server.address().address
	  const port = server.address().port;

	  console.log('GraphQL listening at http://%s:%s', host, port)
	})
}

/********************************************/
/*                   API                    */
/********************************************/

import { index, graph } from './controllers'

app.get('/', index)
app.post('/graphql', graph)

