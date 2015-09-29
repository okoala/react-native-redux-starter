
global.__DEV__ = process.env.NODE_ENV !== 'production'

require('babel/register')
require('./server')
