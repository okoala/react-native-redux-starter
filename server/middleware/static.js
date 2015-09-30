import express from 'express'
import path from 'path'
import app from '../index'

export default function (dir) {
  if (!/^[\/|\\]/.test(dir)) {
    dir = path.join(app.get('root'), '/', dir)
  }

  return express.static(dir, {
    maxAge: app.get('env') === 'development' ? 0 : Infinity
  })
}
