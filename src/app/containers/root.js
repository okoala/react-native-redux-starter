import 'whatwg-fetch'
import React from 'react-native'
import Home from '../views/Home'
import { Provider } from 'react-redux/native'
import configureStore from '../configureStore'

export default class react_native_redux_starter extends React.Component {
  render () {
    return (
      <Provider store={configureStore()} >
        {() => <Home endpoint='/graphql'/>}
      </Provider>
    )
  }
}
