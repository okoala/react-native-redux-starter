/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { Component, PropTypes } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux/native'
import { GraphQLConnector } from '../utils'
import AppActions from '../actions'
import Navigation from '../components/Navitation'

const {
  StyleSheet,
  Text,
  View,
} = React;

@connect(state => state)
export default class AppView extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch, endpoint } = this.props
    const bindedActions = bindActionCreators(AppActions, dispatch)

    return (
      <GraphQLConnector endpoint={endpoint} dispatch={dispatch}>
        <Navigation state={this.state} actions={bindedActions} />
      </GraphQLConnector>
    )
  }
}
