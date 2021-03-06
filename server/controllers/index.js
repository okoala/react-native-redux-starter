import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import schemas from '../schemas'

// const indexHtml = fs.readFileSync(
//   path.join(process.cwd(), 'dist', 'index.html'),
//   { encoding: 'utf8' }
// )

export function index (req, res) {
  res.send('Hello World!')
  // res.send(indexHtml)
}

export function graph (req, res) {
  console.log('true')

  const { query, params } = req.body

  graphql(schemas, query, '', params)
    .then(result => {
      if (result.errors) {
        res.status(400)
      }

      res.join(result)
    })
}
